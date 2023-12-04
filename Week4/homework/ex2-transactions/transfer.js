const { MongoClient } = require("mongodb");
require("dotenv").config();

async function transfer(fromAccountNumber, toAccountNumber, amount, remark) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db(process.env.DATABASE_NAME);
    const accountsCollection = database.collection(process.env.COLLECTION_NAME);

    // Find the source and destination accounts
    const fromAccount = await accountsCollection.findOne({
      account_number: fromAccountNumber,
    });
    const toAccount = await accountsCollection.findOne({
      account_number: toAccountNumber,
    });

    // Check if both accounts exist
    if (!fromAccount || !toAccount) {
      console.log("Error: Invalid account number.");
      return;
    }

    // Check if the source account has sufficient balance
    if (fromAccount.balance < amount) {
      console.log("Error: Insufficient balance for the transfer.");
      return;
    }

    // Update balances
    await accountsCollection.updateOne(
      { account_number: fromAccountNumber },
      { $inc: { balance: -amount } }
    );
    await accountsCollection.updateOne(
      { account_number: toAccountNumber },
      { $inc: { balance: amount } }
    );

    // Increment change numbers
    const fromChangeNumber = fromAccount.account_changes.length + 1;
    const toChangeNumber = toAccount.account_changes.length + 1;

    // Record changes in both accounts
    await accountsCollection.updateOne(
      { account_number: fromAccountNumber },
      {
        $push: {
          account_changes: {
            change_number: fromChangeNumber,
            amount: -amount,
            changed_date: new Date(),
            remark,
          },
        },
      }
    );

    await accountsCollection.updateOne(
      { account_number: toAccountNumber },
      {
        $push: {
          account_changes: {
            change_number: toChangeNumber,
            amount,
            changed_date: new Date(),
            remark,
          },
        },
      }
    );

    console.log(
      `Transfer successful: $${amount} from account ${fromAccountNumber} to account ${toAccountNumber}`
    );
  } finally {
    await client.close();
  }
}

module.exports = transfer;

// Test the transfer function
transfer(101, 102, 1000, "Payment for services");

const { MongoClient } = require("mongodb");
require("dotenv").config();

async function setup() {
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

    // Clean up the existing data
    await accountsCollection.deleteMany({});

    // Fill with sample data
    const sampleData = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: [],
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: [],
      },
      // Add more accounts as needed
    ];

    // Insert sample data
    await accountsCollection.insertMany(sampleData);

    console.log("Setup completed successfully");
  } finally {
    await client.close();
  }
}

module.exports = setup;

// Call the setup function to initialize the database with sample data
setup();

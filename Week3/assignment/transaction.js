const mysql = require("mysql2/promise");

async function runTransaction() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "sql_database",
    port: 3306,
  });

  try {
    await connection.beginTransaction();

    // Update balance for account_number = 101
    const updateBalance101Query = `
      UPDATE account SET balance = balance - 1000 WHERE account_number = ?;
    `;

    // Update balance for account_number = 102
    const updateBalance102Query = `
      UPDATE account SET balance = balance + 1000 WHERE account_number = ?;
    `;

    // Insert record in 'account_changes' table
    const insertAccountChangesQuery = `
      INSERT INTO account_changes (account_number, amount, remark)
      VALUES (?, ?, ?);
    `;

    // Parameters that will be inserted in place of the placeholders (?)
    const params = [101, 102, -1000.0, "Transfer to 102"];

    // Execute the first query
    const [updateBalance101Results] = await connection.query(
      updateBalance101Query,
      [params[0]]
    );

    // Execute the second query
    const [updateBalance102Results] = await connection.query(
      updateBalance102Query,
      [params[1]]
    );

    // Execute the third query
    const [insertAccountChangesResults] = await connection.query(
      insertAccountChangesQuery,
      params.slice(0, 3)
    );

    console.log("Balances updated, and data inserted successfully");

    // Commit the transaction
    await connection.commit();

    console.log("Transaction committed successfully");
  } catch (error) {
    // Rollback in case of an error
    await connection.rollback();
    console.error("Error:", error);
  } finally {
    // Close the database connection
    await connection.end();
  }
}

// Run the transaction function
runTransaction();

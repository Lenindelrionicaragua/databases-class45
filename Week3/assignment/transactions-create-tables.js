const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "sql_database",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err);
    return;
  }

  console.log("Successfully connected to the database");

  // Create the 'account' table
  const createAccountTableQuery = `
    CREATE TABLE IF NOT EXISTS account (
      account_number INT AUTO_INCREMENT PRIMARY KEY,
      balance DECIMAL(10, 2) DEFAULT 0.00
    );
  `;

  connection.query(createAccountTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating account table: " + err);
      return;
    }

    console.log("Account table created successfully");

    // Create the 'account_changes' table
    const createAccountChangesTableQuery = `
      CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT,
        amount DECIMAL(10, 2),
        changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        remark VARCHAR(255),
        FOREIGN KEY (account_number) REFERENCES account(account_number)
      );
    `;

    connection.query(createAccountChangesTableQuery, (err, results) => {
      if (err) {
        console.error("Error creating account_changes table: " + err);
        return;
      }

      console.log("Account_changes table created successfully");

      connection.end();
    });
  });
});

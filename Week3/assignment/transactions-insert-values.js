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

  // Insert sample data into the 'account' table
  const insertAccountDataQuery = `
    INSERT INTO account (account_number, balance) VALUES
      (101, 37000.00),
      (102, 3459.00),
      (103, 18000.00);
  `;

  connection.query(insertAccountDataQuery, (err, results) => {
    if (err) {
      console.error("Error inserting data into account table: " + err);
      return;
    }

    console.log("Sample data inserted into account table");

    // Insert sample data into the 'account_changes' table
    const insertAccountChangesDataQuery = `
      INSERT INTO account_changes (account_number, amount, remark) VALUES
        (101, 10000.00, 'Transfer to 102');
    `;

    connection.query(insertAccountChangesDataQuery, (err, results) => {
      if (err) {
        console.error(
          "Error inserting data into account_changes table: " + err
        );
        return;
      }

      console.log("Sample data inserted into account_changes table");

      // Close the database connection
      connection.end();
    });
  });
});

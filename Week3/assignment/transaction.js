const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "sql_database",
  port: 3306,
});

connection.beginTransaction((err) => {
  if (err) {
    console.error("Error starting the transaction: " + err);
    return connection.end();
  }

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
  connection.query(updateBalance101Query, [params[0]], (err, results) => {
    if (err) {
      return connection.rollback(() => {
        console.error("Error updating balance for account 101: " + err);
        connection.end(); // Close the connection in case of an error
        throw err;
      });
    }

    // Execute the second query
    connection.query(updateBalance102Query, [params[1]], (err, results) => {
      if (err) {
        return connection.rollback(() => {
          console.error("Error updating balance for account 102: " + err);
          connection.end();
          throw err;
        });
      }

      // Execute the third query
      connection.query(
        insertAccountChangesQuery,
        params.slice(0, 3),
        (err, results) => {
          if (err) {
            return connection.rollback(() => {
              console.error(
                "Error inserting data into account_changes: " + err
              );
              connection.end();
              throw err;
            });
          }

          console.log("Balances updated, and data inserted successfully");

          // Commit the transaction
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                console.error("Error committing the transaction: " + err);
                connection.end();
                throw err;
              });
            }

            console.log("Transaction committed successfully");

            // Close the database connection
            connection.end();
          });
        }
      );
    });
  });
});

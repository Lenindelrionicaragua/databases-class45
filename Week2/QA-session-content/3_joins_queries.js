const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "1111",
  database: "authors_table",
  port: 3306,
});

// Query 1: Names of all authors and their corresponding mentors
const query1 = `
  SELECT a.author_name AS author, m.author_name AS mentor
  FROM authors a
  LEFT JOIN authors m ON a.mentor = m.author_id;
`;

queryAsync(connection, query1, "Query 1 result:")
  .then((result1) => {
    console.log("Query 1 result:");
    console.table(result1);

    // Query 2: All columns of authors and their published paper_title
    const query2 = `
      SELECT a.*, p.paper_title
      FROM authors a
      LEFT JOIN research_Papers p ON a.author_id = p.author_id;
    `;

    return queryAsync(connection, query2, "Query 2 result:");
  })
  .then((result2) => {
    console.log("Query 2 result:");
    console.table(result2);
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    // Close the database connection
    connection.end();
  });

// Function to execute queries with promises
function queryAsync(connection, sql, successMessage) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        reject("Error executing query: " + err);
      } else {
        console.log(successMessage);
        resolve(results);
      }
    });
  });
}

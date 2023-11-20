const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "1111",
  database: "authors_table",
  port: 3306,
});

// Connect to the database
connection.connect(async (err) => {
  try {
    if (err) {
      throw new Error("Error connecting to the database: " + err);
    }

    console.log("Successfully connected to the database");

    // Create the authors table if it doesn't exist
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS authors (
      author_id INT PRIMARY KEY AUTO_INCREMENT,
      author_name VARCHAR(255),
      university VARCHAR(255),
      date_of_birth DATE,
      h_index INT,
      gender VARCHAR(10),
      mentor INT,
      CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id)
    );
  `;

    await queryAsync(
      connection,
      createTableQuery,
      "Authors table created or already exists"
    );

    // Check if the mentor column exists
    const columns = await queryAsync(
      connection,
      "SHOW COLUMNS FROM authors LIKE 'mentor'"
    );

    if (columns.length === 0) {
      // Add the mentor column with a foreign key
      const addColumnQuery = `
        ALTER TABLE authors
        ADD COLUMN mentor INT,
        ADD CONSTRAINT fk_mentor
        FOREIGN KEY (mentor) REFERENCES authors(author_id);
      `;

      await queryAsync(
        connection,
        addColumnQuery,
        "Mentor column added successfully with a foreign key"
      );
    } else {
      console.log("Mentor column already exists");
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    // Close the database connection
    connection.end();
  }
});

// Function to execute queries with promise
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

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "1111",
  database: "authors_table",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Successfully connected to the database");

  // Query 1: Retrieves the research paper title and counts the number of authors for each paper.
  const query1 = `
  SELECT rp.paper_title, COUNT(rp.author_id) AS author_count
  FROM research_Papers rp
  GROUP BY rp.paper_id;
`;

  // Query 2: Calculates the total number of research papers published by female authors.
  const query2 = `
  SELECT COUNT(rp.paper_id) AS total_papers
  FROM research_papers rp
  JOIN paper_authors pa ON rp.paper_id = pa.paper_id
  JOIN authors a ON pa.author_id = a.author_id
  WHERE a.gender = 'F';
`;

  // Query 3: Calculates the average h-index of all authors per university.
  const query3 = `
  SELECT a.university, AVG(a.h_index) AS avg_h_index
  FROM authors a
  GROUP BY a.university;
`;

  // Query 4: Calculates the total number of research papers by authors per university, including universities with no research papers.
  const query4 = `
  SELECT a.university, COUNT(rp.paper_id) AS total_papers
  FROM authors a
  LEFT JOIN research_Papers rp ON a.author_id = rp.author_id
  GROUP BY a.university;
`;

  // Query 5: Retrieves the minimum and maximum h-index of all authors per university.
  const query5 = `
  SELECT a.university, MIN(a.h_index) AS min_h_index, MAX(a.h_index) AS max_h_index
  FROM authors a
  GROUP BY a.university;
`;

  // Execute queries
  connection.query(query1, (err, results) => {
    if (err) {
      console.error("Error executing query 1:", err);
    } else {
      console.log("Query 1 results:");
      console.table(results);
    }
  });

  connection.query(query2, (err, results) => {
    if (err) {
      console.error("Error executing query 2:", err);
    } else {
      console.log("Query 2 results:");
      console.table(results);
    }
  });

  connection.query(query3, (err, results) => {
    if (err) {
      console.error("Error executing query 3:", err);
    } else {
      console.log("Query 3 results:");
      console.table(results);
    }
  });

  connection.query(query4, (err, results) => {
    if (err) {
      console.error("Error executing query 4:", err);
    } else {
      console.log("Query 4 results:");
      console.table(results);
    }
  });

  connection.query(query5, (err, results) => {
    if (err) {
      console.error("Error executing query 5:", err);
    } else {
      console.log("Query 5 results:");
      console.table(results);
    }

    // Close the database connection
    connection.end();
  });
});

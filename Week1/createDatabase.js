//import the mysql package
const mysql = require("mysql");

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "1111",
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");

  // Create the `meetup` database
  connection.query("CREATE DATABASE IF NOT EXISTS meetup", (err) => {
    if (err) throw err;
    console.log("Database created or already exists");

    // Use the `meetup` database
    connection.query("USE meetup", (err) => {
      if (err) throw err;

      // Create the `Invitee` table
      connection.query(
        `
          CREATE TABLE IF NOT EXISTS Invitee (
            invitee_no INT AUTO_INCREMENT PRIMARY KEY,
            invitee_name VARCHAR(255) NOT NULL,
            invited_by VARCHAR(255) NOT NULL
          )
        `,
        (err) => {
          if (err) throw err;
          console.log("Invitee table created or already exists");

          // Create the `Room` table
          connection.query(
            `
            CREATE TABLE IF NOT EXISTS Room (
              room_no INT AUTO_INCREMENT PRIMARY KEY,
              room_name VARCHAR(255) NOT NULL,
              floor_number INT NOT NULL
            )
          `,
            (err) => {
              if (err) throw err;
              console.log("Room table created or already exists");

              // Create the `Meeting` table
              connection.query(
                `
              CREATE TABLE IF NOT EXISTS Meeting (
                meeting_no INT AUTO_INCREMENT PRIMARY KEY,
                meeting_title VARCHAR(255) NOT NULL,
                starting_time DATETIME NOT NULL,
                ending_time DATETIME NOT NULL,
                room_no INT,
                FOREIGN KEY (room_no) REFERENCES Room(room_no)
              )
            `,
                (err) => {
                  if (err) throw err;
                  console.log("Meeting table created or already exists");

                  // Insert 5 rows into each table
                  insertRows();
                }
              );
            }
          );
        }
      );
    });
  });
});

function insertRows() {
  // Insert 5 rows into `Invitee` table
  connection.query(
    `
      INSERT INTO Invitee (invitee_name, invited_by)
      VALUES
        ('John Doe', 'Host 1'),
        ('Jane Smith', 'Host 2'),
        ('Bob Johnson', 'Host 3'),
        ('Alice Brown', 'Host 4'),
        ('Charlie Green', 'Host 5')
    `,
    (err) => {
      if (err) throw err;
      console.log("Rows inserted into Invitee table");

      // Insert 5 rows into `Room` table
      connection.query(
        `
        INSERT INTO Room (room_name, floor_number)
        VALUES
          ('Conference Room A', 1),
          ('Conference Room B', 2),
          ('Meeting Room C', 1),
          ('Board Room D', 3),
          ('Training Room E', 2)
      `,
        (err) => {
          if (err) throw err;
          console.log("Rows inserted into Room table");

          // Insert 5 rows into `Meeting` table
          connection.query(
            `
          INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
          VALUES
            ('Team Meeting 1', '2023-11-12 10:00:00', '2023-11-12 11:30:00', 1),
            ('Project Discussion', '2023-11-13 14:00:00', '2023-11-13 16:00:00', 2),
            ('Training Session', '2023-11-14 09:30:00', '2023-11-14 12:00:00', 3),
            ('Board Meeting', '2023-11-15 15:00:00', '2023-11-15 17:00:00', 4),
            ('Team Building', '2023-11-16 13:30:00', '2023-11-16 15:30:00', 5)
        `,
            (err) => {
              if (err) throw err;
              console.log("Rows inserted into Meeting table");

              // Close the MySQL connection
              connection.end((err) => {
                if (err) throw err;
                console.log("Connection closed");
              });
            }
          );
        }
      );
    }
  );
}

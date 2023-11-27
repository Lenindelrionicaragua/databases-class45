// Importa el paquete mysql
const mysql = require("mysql");

// Crea una conexión al servidor MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

// Conéctate al servidor MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");

  // Define las consultas SQL en un array
  const queries = [
    "CREATE DATABASE IF NOT EXISTS meetup",
    "USE meetup",
    `
      CREATE TABLE IF NOT EXISTS Invitee (
        invitee_no INT AUTO_INCREMENT PRIMARY KEY,
        invitee_name VARCHAR(255) NOT NULL,
        invited_by INT NULL,
        FOREIGN KEY (invited_by) REFERENCES Invitee(invitee_no) ON DELETE SET NULL
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS Room (
        room_no INT AUTO_INCREMENT PRIMARY KEY,
        room_name VARCHAR(255) NOT NULL,
        floor_number TINYINT NOT NULL
      )
    `,
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
    // Inserta 5 filas en la tabla `Invitee`
    `
      INSERT INTO Invitee (invitee_name, invited_by)
      VALUES
        ('John Doe', NULL),
        ('Jane Smith', NULL),
        ('Bob Johnson', NULL),
        ('Alice Brown', NULL),
        ('Charlie Green', NULL)
    `,
    // Inserta 5 filas en la tabla `Room`
    `
      INSERT INTO Room (room_name, floor_number)
      VALUES
        ('Conference Room A', 1),
        ('Conference Room B', 2),
        ('Meeting Room C', 1),
        ('Board Room D', 3),
        ('Training Room E', 2)
    `,
    // Inserta 5 filas en la tabla `Meeting`
    `
      INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
      VALUES
        ('Team Meeting 1', '2023-11-12 10:00:00', '2023-11-12 11:30:00', 1),
        ('Project Discussion', '2023-11-13 14:00:00', '2023-11-13 16:00:00', 2),
        ('Training Session', '2023-11-14 09:30:00', '2023-11-14 12:00:00', 3),
        ('Board Meeting', '2023-11-15 15:00:00', '2023-11-15 17:00:00', 4),
        ('Team Building', '2023-11-16 13:30:00', '2023-11-16 15:30:00', 5)
    `,
  ];

  // Ejecuta cada consulta en el array
  queries.forEach((query) => {
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log("Query executed successfully.");
    });
  });

  // Cierra la conexión MySQL
  connection.end((err) => {
    if (err) throw err;
    console.log("Connection closed");
  });
});

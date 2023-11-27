const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "1111",
  database: "authors_table",
});

// Connect to the database
connection.connect(async (err) => {
  try {
    if (err) {
      throw new Error("Error connecting to the database: " + err);
    }

    console.log("Successfully connected to the database");

    // Create tables
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(255),
      conference VARCHAR(255),
      publish_date DATE
    );
    
    CREATE TABLE IF NOT EXISTS paper_authors (
      paper_id INT,
      author_id INT,
      PRIMARY KEY (paper_id, author_id),
      FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id),
      FOREIGN KEY (author_id) REFERENCES authors(author_id)
    );    
  `;

    await queryAsync(
      connection,
      createTableQuery,
      "Research_Papers table created or already exists"
    );

    // Add 15 authors
    const addAuthorsQuery = `
  INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
  VALUES
    ('John Smith', 'Fictional University A', '1985-05-20', 12, 'M', 'Alex M'),
    ('Emily Johnson', 'Fictional University B', '1990-02-10', 8, 'F', 'Martin M' ),
    ('David Brown', 'Fictional University C', '1988-07-15', 10, 'M', 'Rob M'),
    ('Emma White', 'Fictional University D', '1995-04-30', 9, 'F'), 'Zack T',
    ('Michael Turner', 'Fictional University E', '1992-11-22', 11, 'M', 'Jeff B'),
    ('Sophia Adams', 'Fictional University F', '1987-09-05', 7, 'F', 'Dave N'),
    ('Christopher Harris', 'Fictional University G', '1993-03-18', 8, 'M', 'Martin F'),
    ('Olivia Clark', 'Fictional University H', '1991-06-12', 10, 'F', 'Joe S'),
    ('Daniel Walker', 'Fictional University I', '1989-12-25', 9, 'M', 'Martin S'),
    ('Isabella Lee', 'Fictional University J', '1994-08-08', 11, 'F', 'Julio C'),
    ('William Taylor', 'Fictional University K', '1986-01-03', 8, 'M', 'Carlos F'),
    ('Ava Turner', 'Fictional University L', '1996-06-28', 12, 'F', 'Marlon B'),
    ('Matthew Carter', 'Fictional University M', '1997-09-14', 7, 'M', 'Axel R'),
    ('Ella Anderson', 'Fictional University N', '1984-04-17', 10, 'F', 'Sara B'),
    ('James Wilson', 'Fictional University O', '1998-02-08', 9, 'M', 'Sonya S');
`;

    await queryAsync(
      connection,
      addAuthorsQuery,
      "Authors data inserted successfully"
    );

    // Log a message after the insertion
    console.log("Data inserted into authors table.");

    // Add 30 research papers
    const addPapersQuery = `
  INSERT INTO research_Papers (paper_id, paper_title, conference, publish_date, author_id)
  VALUES
    ('Advancements in Quantum Computing', 'International Tech Summit', '2022-05-10', 1),
    ('Exploring Sustainable Energy Sources', 'Global Science Conference', '2022-06-15', 2),
    ('Neural Networks and Artificial Intelligence', 'AI Innovation Forum', '2022-07-20', 3),
    ('Future of Space Exploration', 'Cosmic Discoveries Symposium', '2022-08-25', 4),
    ('Innovations in Biomedical Research', 'Medical Breakthroughs Conference', '2022-09-30', 5),
    ('Blockchain Technology and Cryptocurrencies', 'Digital Finance Expo', '2022-10-05', 6),
    ('Advances in Robotics and Automation', 'Tech Frontier Summit', '2022-11-10', 7),
    ('Climate Change and Environmental Conservation', 'Earth Summit', '2022-12-15', 8),
    ('Next-Gen Internet Technologies', 'Web Innovators Conference', '2023-01-20', 9),
    ('Revolutionizing Transportation with AI', 'Future Mobility Expo', '2023-02-25', 10),
    ('Frontiers in Materials Science', 'Materials Research Symposium', '2023-03-01', 11),
    ('The Future of Healthcare Technology', 'HealthTech Summit', '2023-04-05', 12),
    ('SpaceX: Journey to Mars', 'Space Exploration Symposium', '2023-05-10', 13),
    ('Digital Art and Virtual Reality', 'Creative Tech Expo', '2023-06-15', 14),
    ('Emerging Trends in Cybersecurity', 'CyberSec Conference', '2023-07-20', 15),
    ('Future of Quantum Cryptography', 'Quantum Security Forum', '2023-08-25', 1),
    ('Green Architecture and Sustainable Design', 'Architectural Innovations Expo', '2023-09-30', 2),
    ('Advances in Genetic Engineering', 'Genetic Research Congress', '2023-10-05', 3),
    ('Smart Cities and Urban Development', 'Smart City Symposium', '2023-11-10', 4),
    ('The Art of Data Visualization', 'Data Science Showcase', '2023-12-15', 5),
    ('Augmented Reality: Shaping the Future', 'AR/VR World Expo', '2024-01-20', 6),
    ('Future Trends in Nanotechnology', 'NanoTech Summit', '2024-02-25', 7),
    ('Innovations in Renewable Energy', 'Renewable Energy Forum', '2024-03-01', 8),
    ('Health and Wellness in the Digital Age', 'Digital Health Expo', '2024-04-05', 9),
    ('Exploring the Mysteries of the Universe', 'Cosmology Symposium', '2024-05-10', 10),
    ('The Future of Wearable Technology', 'Wearable Tech Showcase', '2024-06-15', 11),
    ('Advances in Quantum Biology', 'BioTech Revolution Congress', '2024-07-20', 12),
    ('Next-Gen Entertainment Technologies', 'Entertainment Tech Expo', '2024-08-25', 13),
    ('Revolutionizing Agriculture with Tech', 'AgriTech Innovations Summit', '2024-09-30', 14),
    ('Future Trends in Artificial Organs', 'MedTech Symposium', '2024-10-05', 15);
`;

    await queryAsync(
      connection,
      addPapersQuery,
      "Research papers added successfully"
    );
  } catch (error) {
    console.error("Error inserting research papers:", error);
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

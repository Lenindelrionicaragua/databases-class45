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

    // Create the research_Papers table
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS research_Papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(255),
      conference VARCHAR(255),
      publish_date DATE,
      author_id INT,
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
  INSERT INTO authors (author_name, university, date_of_birth, h_index, gender)
  VALUES
    ('John Smith', 'Fictional University A', '1985-05-20', 12, 'Male'),
    ('Emily Johnson', 'Fictional University B', '1990-02-10', 8, 'Female'),
    ('David Brown', 'Fictional University C', '1988-07-15', 10, 'Male'),
    ('Emma White', 'Fictional University D', '1995-04-30', 9, 'Female'),
    ('Michael Turner', 'Fictional University E', '1992-11-22', 11, 'Male'),
    ('Sophia Adams', 'Fictional University F', '1987-09-05', 7, 'Female'),
    ('Christopher Harris', 'Fictional University G', '1993-03-18', 8, 'Male'),
    ('Olivia Clark', 'Fictional University H', '1991-06-12', 10, 'Female'),
    ('Daniel Walker', 'Fictional University I', '1989-12-25', 9, 'Male'),
    ('Isabella Lee', 'Fictional University J', '1994-08-08', 11, 'Female'),
    ('William Taylor', 'Fictional University K', '1986-01-03', 8, 'Male'),
    ('Ava Turner', 'Fictional University L', '1996-06-28', 12, 'Female'),
    ('Matthew Carter', 'Fictional University M', '1997-09-14', 7, 'Male'),
    ('Ella Anderson', 'Fictional University N', '1984-04-17', 10, 'Female'),
    ('James Wilson', 'Fictional University O', '1998-02-08', 9, 'Male');
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
    (null, 'Advancements in Quantum Computing', 'International Tech Summit', '2022-05-10', 1),
    (null, 'Exploring Sustainable Energy Sources', 'Global Science Conference', '2022-06-15', 2),
    (null, 'Neural Networks and Artificial Intelligence', 'AI Innovation Forum', '2022-07-20', 3),
    (null, 'Future of Space Exploration', 'Cosmic Discoveries Symposium', '2022-08-25', 4),
    (null, 'Innovations in Biomedical Research', 'Medical Breakthroughs Conference', '2022-09-30', 5),
    (null, 'Blockchain Technology and Cryptocurrencies', 'Digital Finance Expo', '2022-10-05', 6),
    (null, 'Advances in Robotics and Automation', 'Tech Frontier Summit', '2022-11-10', 7),
    (null, 'Climate Change and Environmental Conservation', 'Earth Summit', '2022-12-15', 8),
    (null, 'Next-Gen Internet Technologies', 'Web Innovators Conference', '2023-01-20', 9),
    (null, 'Revolutionizing Transportation with AI', 'Future Mobility Expo', '2023-02-25', 10),
    (null, 'Frontiers in Materials Science', 'Materials Research Symposium', '2023-03-01', 11),
    (null, 'The Future of Healthcare Technology', 'HealthTech Summit', '2023-04-05', 12),
    (null, 'SpaceX: Journey to Mars', 'Space Exploration Symposium', '2023-05-10', 13),
    (null, 'Digital Art and Virtual Reality', 'Creative Tech Expo', '2023-06-15', 14),
    (null, 'Emerging Trends in Cybersecurity', 'CyberSec Conference', '2023-07-20', 15),
    (null, 'Future of Quantum Cryptography', 'Quantum Security Forum', '2023-08-25', 1),
    (null, 'Green Architecture and Sustainable Design', 'Architectural Innovations Expo', '2023-09-30', 2),
    (null, 'Advances in Genetic Engineering', 'Genetic Research Congress', '2023-10-05', 3),
    (null, 'Smart Cities and Urban Development', 'Smart City Symposium', '2023-11-10', 4),
    (null, 'The Art of Data Visualization', 'Data Science Showcase', '2023-12-15', 5),
    (null, 'Augmented Reality: Shaping the Future', 'AR/VR World Expo', '2024-01-20', 6),
    (null, 'Future Trends in Nanotechnology', 'NanoTech Summit', '2024-02-25', 7),
    (null, 'Innovations in Renewable Energy', 'Renewable Energy Forum', '2024-03-01', 8),
    (null, 'Health and Wellness in the Digital Age', 'Digital Health Expo', '2024-04-05', 9),
    (null, 'Exploring the Mysteries of the Universe', 'Cosmology Symposium', '2024-05-10', 10),
    (null, 'The Future of Wearable Technology', 'Wearable Tech Showcase', '2024-06-15', 11),
    (null, 'Advances in Quantum Biology', 'BioTech Revolution Congress', '2024-07-20', 12),
    (null, 'Next-Gen Entertainment Technologies', 'Entertainment Tech Expo', '2024-08-25', 13),
    (null, 'Revolutionizing Agriculture with Tech', 'AgriTech Innovations Summit', '2024-09-30', 14),
    (null, 'Future Trends in Artificial Organs', 'MedTech Symposium', '2024-10-05', 15);
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

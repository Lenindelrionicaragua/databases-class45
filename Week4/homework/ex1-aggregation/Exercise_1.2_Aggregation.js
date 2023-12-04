const { MongoClient } = require("mongodb");
require("dotenv").config();

// MongoDB connection details from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_NAME;

// MongoDB client instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to connect to the database
async function performDatabaseOperations() {
  try {
    await client.connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

// Function to close the database connection
async function closeDatabase() {
  try {
    await client.close();
  } catch (error) {
    console.error("Error closing the database connection:", error);
    throw error;
  }
}

// Function to get all continents with uppercase names
async function getAllContinents(db) {
  try {
    const continents = await db
      .collection(collectionName)
      .distinct("Country", { Country: { $regex: /^[A-Z\s]+$/ } });

    return continents;
  } catch (error) {
    console.error("Error getting continents:", error);
    throw error;
  }
}

// Function to get continent population by year and age
const getContinentPopulationByYearAndAge = async (db, year, age) => {
  const continentPopulation = [];

  try {
    const allContinents = await getAllContinents(db);

    for (const continent of allContinents) {
      console.log(`Processing continent: ${continent}`);

      const result = await db
        .collection(collectionName)
        .aggregate([
          { $match: { Country: continent, Year: year, Age: age } },
          {
            $group: {
              _id: "$_id", // Keep the original _id field
              Country: { $first: "$Country" }, // Include the Country field
              Year: { $first: "$Year" },
              Age: { $first: "$Age" },
              M: { $sum: "$M" },
              F: { $sum: "$F" },
              TotalPopulation: { $sum: { $add: ["$M", "$F"] } },
            },
          },
        ])
        .toArray();

      console.log(
        `Processing continent: ${continent}, Year: ${year}, Age: ${age}`
      );

      continentPopulation.push(...result);
    }

    return continentPopulation;
  } catch (error) {
    console.error("Error during aggregation:", error);
    throw error;
  }
};

// Define an async function to wrap the code
const main = async () => {
  try {
    await performDatabaseOperations();

    // Call the function to get and log continent population by year and age
    const result = await getContinentPopulationByYearAndAge(
      client.db(dbName),
      2020,
      "100+"
    );

    console.log(result);
  } finally {
    // Ensure the database connection is closed
    await closeDatabase();
  }
};

// Call the async function
main();

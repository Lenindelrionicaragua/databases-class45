const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_NAME;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function performDatabaseOperations() {
  try {
    await client.connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

async function closeDatabase() {
  try {
    await client.close();
  } catch (error) {
    console.error("Error closing the database connection:", error);
    throw error;
  }
}

async function getPopulationByYear(db, country) {
  try {
    const result = await db
      .collection(collectionName)
      .aggregate([
        { $match: { Country: country } },
        {
          $group: {
            _id: "$Year",
            countPopulation: {
              $sum: { $add: ["$M", "$F"] },
            },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id",
            countPopulation: 1,
          },
        },
        { $sort: { year: 1 } },
      ])
      .toArray();

    return result;
  } catch (error) {
    console.error("Error during aggregation:", error);
    throw error;
  }
}

async function getAndLogPopulationByYear(country) {
  try {
    await performDatabaseOperations();
    const db = client.db(dbName);

    // Aggregation Pipeline print statement
    console.log("Aggregation Pipeline:", [
      { $match: { Country: country } },
      // ... other stages
    ]);

    // Aggregation execution statement
    const result = await getPopulationByYear(db, country);
    console.log(result);
  } finally {
    await closeDatabase();
  }
}

// Call the function to get and log population by year for a specific country
getAndLogPopulationByYear("Netherlands");

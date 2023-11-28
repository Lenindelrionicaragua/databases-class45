require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const { seedDatabase } = require("./seedDatabase");

async function createEpisodeExercise(client) {
  try {
    const database = client.db("databaseWeek3");
    const result = await database.collection("episodes").insertOne({
      episode: "S09E13",
      title: "MOUNTAIN HIDE-AWAY",
      elements: [
        "CIRRUS",
        "CLOUDS",
        "CONIFER",
        "DECIDIOUS",
        "GRASS",
        "MOUNTAIN",
        "MOUNTAINS",
        "RIVER",
        "SNOWY_MOUNTAIN",
        "TREE",
        "TREES",
      ],
    });

    console.log(
      `Created season 9 episode 13 and the document got the id ${result.insertedId}`
    );
  } catch (error) {
    console.error("Error creating episode:", error);
  }
}

async function findEpisodesExercises(client) {
  try {
    const database = client.db("databaseWeek3");

    const episode2Season2 = await database
      .collection("episodes")
      .findOne({ season: 2, episode: 2 });

    if (episode2Season2) {
      console.log(
        `The title of episode 2 in season 2 is ${episode2Season2.title}`
      );
    } else {
      console.log("Episode not found");
    }

    const blackRiverEpisode = await database
      .collection("episodes")
      .findOne({ title: "BLACK RIVER" });

    if (blackRiverEpisode) {
      console.log(
        `The season and episode number of the "BLACK RIVER" episode is S${blackRiverEpisode.season}E${blackRiverEpisode.episode}`
      );
    } else {
      console.log("Episode not found");
    }

    // Find all episode titles where Bob Ross painted a CLIFF
    const cliffEpisodes = await database
      .collection("episodes")
      .find({ elements: "CLIFF" })
      .toArray();
    const cliffEpisodeTitles = cliffEpisodes.map((episode) => episode.title);
    console.log(
      `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodeTitles.join(
        ", "
      )}`
    );

    // Find all episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE
    const cliffAndLighthouseEpisodes = await database
      .collection("episodes")
      .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
      .toArray();
    const cliffAndLighthouseEpisodeTitles = cliffAndLighthouseEpisodes.map(
      (episode) => episode.title
    );
    console.log(
      `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseEpisodeTitles.join(
        ", "
      )}`
    );
  } catch (error) {
    console.error("Error finding episodes:", error);
  }
}

async function updateEpisodeExercises(client) {
  try {
    const database = client.db("databaseWeek3");

    // Update the name of episode 13 in season 30
    const updateResult = await database
      .collection("episodes")
      .updateOne(
        { season: 30, episode: 13 },
        { $set: { title: "BLUE RIDGE FALLS" } }
      );
    console.log(
      `Ran a command to update episode 13 in season 30 and it updated ${updateResult.modifiedCount} episodes`
    );

    // Update all documents in the collection that have 'BUSHES' in the elements array to now have 'BUSH'
    const updateBushResult = await database
      .collection("episodes")
      .updateMany({ elements: "BUSHES" }, { $set: { "elements.$": "BUSH" } });
    console.log(
      `Ran a command to update all the BUSHES to BUSH and it updated ${updateBushResult.modifiedCount} episodes`
    );
  } catch (error) {
    console.error("Error updating episodes:", error);
  }
}

async function deleteEpisodeExercise(client) {
  try {
    const database = client.db("databaseWeek3");

    // Delete episode 14 in season 31
    const deleteResult = await database
      .collection("episodes")
      .deleteOne({ season: 31, episode: 14 });
    console.log(
      `Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`
    );
  } catch (error) {
    console.error("Error deleting episode:", error);
  }
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    await client.close();
  }
}

main();

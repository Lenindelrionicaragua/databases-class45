const setup = require("./setup");
const transfer = require("./transfer");

async function test() {
  // Call the setup function to initialize the database with sample data
  await setup();

  // Test the transfer function
  await transfer(101, 102, 1000, "Payment for services");
}

test();

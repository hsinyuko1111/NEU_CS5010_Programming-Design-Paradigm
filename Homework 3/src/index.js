import readline from "node:readline/promises";
import { AirBnBDataHandler } from "./AirBnBDataHandler.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const filePath = await rl.question("Enter the path to the CSV file: ");
  await AirBnBDataHandler.load(filePath);

  const minPrice = await rl.question("Enter minimum price (or leave blank): ");
  const maxPrice = await rl.question("Enter maximum price (or leave blank): ");
  const minRooms = await rl.question(
    "Enter minimum number of rooms (or leave blank): "
  );
  const maxRooms = await rl.question(
    "Enter maximum number of rooms (or leave blank): "
  );
  const minScore = await rl.question(
    "Enter minimum review score (or leave blank): "
  );
  const maxScore = await rl.question(
    "Enter maximum review score (or leave blank): "
  );

  AirBnBDataHandler.filter({
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    minRooms: minRooms ? parseInt(minRooms) : undefined,
    maxRooms: maxRooms ? parseInt(maxRooms) : undefined,
    minScore: minScore ? parseFloat(minScore) : undefined,
    maxScore: maxScore ? parseFloat(maxScore) : undefined,
  });

  const stats = AirBnBDataHandler.computeStats();
  console.log(`\nFiltered Listings Count: ${stats.count}`);
  console.log(`Average Price Per Room: $${stats.avgPricePerRoom.toFixed(2)}`);

  const rankings = AirBnBDataHandler.computeHostRankings();
  console.log("\nTop Hosts by Listings:");
  console.log(
    rankings
      //   .slice(0, 10)
      .map(([host, count]) => `Host ID: ${host}, Listings: ${count}`)
      .join("\n")
  );

  rl.close();
})();

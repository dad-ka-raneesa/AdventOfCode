//answer 288
const fs = require("fs");
const { getAsteroidPosition, getAsteroidPositionsInfo, getBestStation } = require('./asteroids');

const main = function() {
  const map = fs.readFileSync("./day10/asteroids.txt", "utf8").split("\n").map(area => area.split(''));
  const asteroidPositions = map.reduce(getAsteroidPosition, []);
  const possibleMonitoringStations = getAsteroidPositionsInfo(asteroidPositions);
  const bestStation = possibleMonitoringStations.reduce(getBestStation, {});
  console.log(bestStation.detectedAsteroidCount);
}

main();
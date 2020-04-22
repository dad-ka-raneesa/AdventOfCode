const { readFileSync } = require("fs");

const getMax = (max, num) => max > num.detectedAsteroidCount ? max : num.detectedAsteroidCount;

const getAngle = (pos1, pos2) => Math.atan2(pos1.x - pos2.x, pos1.y - pos2.y);

const getAsteroidPositionsInfo = function(positions) {
  return positions.map(station => {
    const remainingAsteroid = positions.filter(pos => station.x != pos.x || station.y != pos.y);
    const angles = remainingAsteroid.map(asteroid => getAngle(station, asteroid));
    const detectedAsteroids = [...new Set(angles)];
    return { pos: station, detectedAsteroidCount: detectedAsteroids.length };
  })
}

const getAsteroidPosition = function(allCoordinates, locations, colId) {
  return locations.reduce((allCoordinates, location, rowId) => {
    location === '#' && allCoordinates.push({ x: rowId, y: colId });
    return allCoordinates;
  }, allCoordinates)
}

const main = function() {
  const map = readFileSync("./day10/asteroids.txt", "utf8").split("\n").map(area => area.split(''));
  const asteroidPositions = map.reduce(getAsteroidPosition, []);
  const possibleMonitoringStations = getAsteroidPositionsInfo(asteroidPositions);
  const bestStation = possibleMonitoringStations.reduce(getMax, 0);
  console.log(bestStation);
}

main();
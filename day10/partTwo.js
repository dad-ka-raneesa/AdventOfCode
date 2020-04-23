//answer 616
const fs = require("fs");
const { getAsteroidPosition, getAsteroidPositionsInfo, getRemainingAsteroids, getBestStation, getAngle } = require('./asteroids');

const groupSameAngleAsteroids = function(asteroids, asteroid) {
  if (asteroids.length < 1) {
    asteroids.push([asteroid]);
    return asteroids;
  }
  if (asteroids[asteroids.length - 1][0].angle === asteroid.angle) {
    asteroids[asteroids.length - 1].push(asteroid);
    return asteroids;
  }
  asteroids.push([asteroid])
  return asteroids;
}

const sortByDistance = function(pos1, pos2) {
  return pos1.distance > pos2.distance ? 1 : pos1.distance < pos2.distance ? -1 : 0;
}
const sortByAngle = function(pos1, pos2) {
  return pos1.angle > pos2.angle ? 1 : pos1.angle < pos2.angle ? -1 : 0;
}
const getDistance = (asteroid, station) => Math.hypot(station.x - asteroid.x, station.y - asteroid.y);

const modulus = (numerator, denominator) => ((numerator % denominator) + denominator) % denominator;

const getClockwiseAngleInDegree = function(station, asteroid) {
  const angleInRadians = getAngle(station, asteroid);
  const angleInDegrees = modulus(angleInRadians * 180 / Math.PI, 360);
  return modulus(angleInDegrees - 270, 360);
};

const vaporizeAsteroids = function(asteroids, station) {
  const vaporizedAsteroids = [];
  const remainingAsteroid = getRemainingAsteroids(asteroids, station);
  let remainingAsteroidInfo = remainingAsteroid.map(asteroid => {
    const angleInDegrees = getClockwiseAngleInDegree(asteroid, station);
    const distance = getDistance(asteroid, station);
    return { x: asteroid.x, y: asteroid.y, angle: angleInDegrees, distance };
  });
  remainingAsteroidInfo = remainingAsteroidInfo.sort(sortByAngle);
  let groupedAsteroids = remainingAsteroidInfo.reduce(groupSameAngleAsteroids, []);
  groupedAsteroids = groupedAsteroids.map(group => group.sort(sortByDistance));
  for (let index = 0; index < groupedAsteroids.length; index++) {
    const asteroid = groupedAsteroids[index % groupedAsteroids.length].shift();
    asteroid && vaporizedAsteroids.push(asteroid);
  }
  return vaporizedAsteroids;
}

const main = function() {
  const map = fs.readFileSync("./day10/asteroids.txt", "utf8").split("\n").map(area => area.split(''));
  const asteroidPositions = map.reduce(getAsteroidPosition, []);
  const possibleMonitoringStations = getAsteroidPositionsInfo(asteroidPositions);
  const bestStation = possibleMonitoringStations.reduce(getBestStation, {});
  const vaporizedAsteroidsInfo = vaporizeAsteroids(asteroidPositions, bestStation.pos);
  const asteroid200 = vaporizedAsteroidsInfo[199];
  console.log(asteroid200.x * 100 + asteroid200.y);
}
main();
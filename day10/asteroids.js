const getMax = (bestStation, asteroid) => bestStation.detectedAsteroidCount > asteroid.detectedAsteroidCount ? bestStation : asteroid;

const getAngle = (pos1, pos2) => Math.atan2(pos1.x - pos2.x, pos1.y - pos2.y);

const getRemainingAsteroids = (asteroids, station) => asteroids.filter(pos => station.x != pos.x || station.y != pos.y);

const getAsteroidPositionsInfo = function(positions) {
  return positions.map(station => {
    const remainingAsteroid = getRemainingAsteroids(positions, station);
    const angles = remainingAsteroid.map(asteroid => getAngle(station, asteroid));
    const detectedAsteroids = [...new Set(angles)];
    return { pos: station, detectedAsteroidCount: detectedAsteroids.length };
  })
}

const getAsteroidPosition = function(allCoordinates, locations, colId) {
  locations.forEach((location, rowId) => location === '#' && allCoordinates.push({ x: rowId, y: colId }));
  return allCoordinates;
}


module.exports = { getAsteroidPosition, getAsteroidPositionsInfo, getAngle, getMax };
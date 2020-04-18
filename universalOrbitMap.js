//part1 answer 241064

const fs = require('fs');

const mapOrbits = function(mappedOrbits, connection) {
  const [orbit1, orbit2] = connection.split(')');
  if (!mappedOrbits[orbit2]) {
    mappedOrbits[orbit2] = { connectedTo: [], count: 0 };
  }
  mappedOrbits[orbit2].connectedTo.push(orbit1);
  mappedOrbits[orbit2].count++;
  return mappedOrbits;
}

const getOrbitsCount = function(orbits, orbit) {
  if (orbit === 'COM') return 0;
  const { connectedTo, count } = orbits[orbit];
  return count + getOrbitsCount(orbits, connectedTo[0]);
};

const main = function() {
  const inputs = fs.readFileSync('./inputs/universalOrbitMap.txt', 'utf8').split('\n');
  const orbits = inputs.reduce(mapOrbits, {});
  const orbitsList = Object.keys(orbits);
  const totalOrbits = orbitsList.reduce((total, orbit) => total + getOrbitsCount(orbits, orbit), 0);
  console.log(totalOrbits);
}

main();

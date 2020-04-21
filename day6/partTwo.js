//418
const fs = require('fs');
const { mapOrbits } = require('./universalOrbitMap');
const getOrbitMap = function(orbits, orbit, orbitsList) {
  if (orbit === 'COM') return orbitsList;
  orbitsList.push(orbit);
  return getOrbitMap(orbits, orbits[orbit].connectedTo[0], orbitsList);
}

const getMinimumOrbitalTransfers = function(orbits, orbit1, orbit2) {
  const Orbit1Map = getOrbitMap(orbits, orbit1, []);
  const Orbit2Map = getOrbitMap(orbits, orbit2, []);
  const indexOfCommonOrbitIn1 = Orbit1Map.findIndex(orbit => Orbit2Map.includes(orbit)) || 0;
  const indexOfCommonOrbitIn2 = Orbit2Map.findIndex(orbit => Orbit1Map.includes(orbit)) || 0;
  const orbitsList = Orbit1Map.slice(0, indexOfCommonOrbitIn1).concat(Orbit2Map.slice(0, indexOfCommonOrbitIn2));
  return orbitsList ? orbitsList.length - 2 : 0;
}

const main = function() {
  const inputs = fs.readFileSync('./day6/universalOrbitMap.txt', 'utf8').split('\n');
  const orbits = inputs.reduce(mapOrbits, {});
  const orbitsCount = getMinimumOrbitalTransfers(orbits, 'YOU', 'SAN');
  console.log(orbitsCount);
}

main();

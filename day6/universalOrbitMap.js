const mapOrbits = function(mappedOrbits, connection) {
  const [orbit1, orbit2] = connection.split(')');
  if (!mappedOrbits[orbit2]) {
    mappedOrbits[orbit2] = { connectedTo: [], count: 0 };
  }
  mappedOrbits[orbit2].connectedTo.push(orbit1);
  mappedOrbits[orbit2].count++;
  return mappedOrbits;
}

module.exports = { mapOrbits };

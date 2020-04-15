const fs = require('fs');

const getMinMax = function(a,b) {a 
  return result;
};

const getAllPoints = function(line) {
  const allPoints = [];
  const [[x1, y1], [x2, y2]] = line;
  const xMin = x1 < x2 ? x1 : x2;
  const XMax = x2 > x1 ? x2 : x1;
  const yMin = y1 < y2 ? y1 : y2;
  const yMax = y2 > y1 ? y2 : y1;
  for (let startX = xMin; startX <= XMax; startX++) {
    for (let startY = yMin; startY <= yMax; startY++) {
      allPoints.push([startX, startY]);
    }
  }
  return allPoints;
}

const findIntersect = function(line1, line2) {
  const line1Points = getAllPoints(line1);
  const line2Points = getAllPoints(line2);
  return line1Points.filter(([x1, y1]) => line2Points.some(([x2, y2]) => x1 == x2 && y1 == y2));
};

const getIntersectPoints = function(wire1Path, wire2Path) {
  const intersectPoints = [];
  for (let i = 0; i < wire1Path.length - 1; i++) {
    for (let j = 0; j < wire2Path.length - 1; j++) {
      const line1 = wire1Path.slice(i, i + 2);
      const line2 = wire2Path.slice(j, j + 2);
      const intersect = findIntersect(line1, line2);
      intersect.length && intersectPoints.push(...intersect);
    }
  }
  return intersectPoints;
};

const getWirePath = function(wirePath, instruction) {
  const direction = instruction.slice(0, 1);
  const length = +instruction.slice(1);
  const [x, y] = wirePath[wirePath.length - 1];
  if (direction == 'R') wirePath.push([x + length, y]);
  if (direction == 'L') wirePath.push([x - length, y]);
  if (direction == 'U') wirePath.push([x, y + length]);
  if (direction == 'D') wirePath.push([x, y - length]);
  return wirePath;
};

const findShortestDistance = function(shortestDistance, [x, y]) {
  const distance = x + y;
  if (distance > 0 && distance < shortestDistance) return distance;
  return shortestDistance;
};

const main = function() {
  const wirePoints = fs.readFileSync('./inputs/manhattanDistance.txt', 'utf8').split('\n')
  const [wire1, wire2] = wirePoints.map(w => w.split(','));
  // wire1 = ['R8', 'U5', 'L5', 'D3'];
  // wire2 = ['U7', 'R6', 'D4', 'L4'];
  const wire1Path = wire1.reduce(getWirePath, [[0, 0]]);
  const wire2Path = wire2.reduce(getWirePath, [[0, 0]]);
  const intersectPoints = getIntersectPoints(wire1Path, wire2Path);
  console.log(intersectPoints);
  // console.log(intersectPoints.reduce(findShortestDistance, Infinity));
}

main();
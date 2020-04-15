const fs = require('fs');

const onSegment = function(p, q, r) {
  return (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  );
};

const isProperOrientation = function(p1, q1, p2, q2) {
  return (
    orientation(p1, q1, p2) != orientation(p1, q1, q2) &&
    orientation(p2, q2, p1) != orientation(p2, q2, q1)
  );
};

const orientation = function(p, q, r) {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val == 0) return 0;
  return val > 0 ? 1 : 2;
};

const doIntersect = function(p1, q1, p2, q2) {
  return (
    isProperOrientation(p1, q1, p2, q2) ||
    (!orientation(p1, q1, p2) && onSegment(p1, p2, q1)) ||
    (!orientation(p1, q1, q2) && onSegment(p1, q2, q1)) ||
    (!orientation(p2, q2, p1) && onSegment(p2, p1, q2)) ||
    (!orientation(p2, q2, q1) && onSegment(p2, q1, q2))
  );
};

const getInterSectionPoint = function(lineA, lineB) {
  const x1 = lineA.start.x;
  const x2 = lineA.end.x;
  const y1 = lineA.start.y;
  const y2 = lineA.end.y;
  const x3 = lineB.start.x;
  const x4 = lineB.end.x;
  const y3 = lineB.start.y;
  const y4 = lineB.end.y;
  const x =
    ((x2 * y1 - x1 * y2) * (x4 - x3) - (x4 * y3 - x3 * y4) * (x2 - x1)) /
    ((x2 - x1) * (y4 - y3) - (x4 - x3) * (y2 - y1));
  const y =
    ((x2 * y1 - x1 * y2) * (y4 - y3) + (x4 * y3 - x3 * y4) * (y2 - y1)) /
    ((x2 - x1) * (y4 - y3) - (x4 - x3) * (y2 - y1));
  return { x, y, lineA, lineB };
};

const getInsects = function(wire1, wire2) {
  const intersects = [];

  wire1.forEach(line1 => {
    wire2.forEach(line2 => {
      if (doIntersect(line1.start, line1.end, line2.start, line2.end)) {
        intersects.push(getInterSectionPoint(line1, line2));
      }
    })
  });

  return intersects;
}

const getLines = function(currentPos, path) {
  for (i = 0; i < path.length; i++) {
    let direction = path[i][0];
    let moveBy = +path[i].slice(1);
    let xPos = currentPos[currentPos.length - 1].end.x;
    let yPos = currentPos[currentPos.length - 1].end.y;
    if (direction == 'L') {
      xPos = xPos - moveBy;
    } else if (direction == 'R') {
      xPos = xPos + moveBy;
    } else if (direction == 'U') {
      yPos = yPos + moveBy;
    } else if (direction == 'D') {
      yPos = yPos - moveBy;
    }
    currentPos.push({
      start: currentPos[currentPos.length - 1].end,
      end: { x: xPos, y: yPos }
    });
  }
  return currentPos;
};

const main = function() {
  const wirePoints = fs.readFileSync('./inputs/manhattanDistance.txt', 'utf8').split('\n')
  const [input1, input2] = wirePoints.map(w => w.split(','));
  const startWire = [
    {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 }
    }
  ];

  const wire1 = getLines(startWire.slice(), input1);
  const wire2 = getLines(startWire.slice(), input2);
  const intersects = getInsects(wire1, wire2);

  const distance = intersects.map(({ x, y }) => Math.abs(x) + Math.abs(y)).filter(d => d > 0);

  console.log(Math.min(...distance));
}

main();
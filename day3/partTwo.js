//answer 122514
const fs = require('fs');
const { getInsects, getLines } = require('./crossedWires');

const lengthOfLine = function(line) {
  const { start, end } = line;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return Math.hypot(dx, dy);
};
const findLengthsOfLines = function(wire1, stop) {
  let length = 0;
  for (let i = 0; i < wire1.indexOf(stop); i++) {
    length += lengthOfLine(wire1[i]);
  }
  return length;
};
const getTotalLength = function(intersect, wire1, wire2) {
  let totalLength = 0;
  totalLength += findLengthsOfLines(wire1, intersect.lineA);
  totalLength += lengthOfLine({
    start: intersect.lineA.start,
    end: { x: intersect.x, y: intersect.y }
  });
  totalLength += findLengthsOfLines(wire2, intersect.lineB);
  totalLength += lengthOfLine({
    start: intersect.lineB.start,
    end: { x: intersect.x, y: intersect.y }
  });
  return totalLength;
};
const main = function() {
  const wirePoints = fs.readFileSync('./day3/crossedWires.txt', 'utf8').split('\n');
  const [input1, input2] = wirePoints.map(w => w.split(','));
  const startWire = [
    {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 }
    }
  ];
  let wire1 = getLines(startWire.slice(), input1);
  let wire2 = getLines(startWire.slice(), input2);
  const intersects = getInsects(wire1, wire2);
  let lengths = [];
  for (let i = 0; i < intersects.length; i++) {
    lengths.push(getTotalLength(intersects[i], wire1, wire2));
  }
  lengths = lengths.filter(e => e > 0);
  console.log(Math.min(...lengths));
};
main();
//answer 5319
const fs = require('fs');
const { getInsects, getLines } = require('./crossedWires');

const main = function() {
  const wirePoints = fs.readFileSync('./day3/crossedWires.txt', 'utf8').split('\n')
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
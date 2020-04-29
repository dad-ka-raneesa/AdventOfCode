const { Computer } = require('./computer');

const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;

const deltas = {};
deltas[NORTH] = [0, 1];
deltas[SOUTH] = [0, -1];
deltas[EAST] = [1, 0];
deltas[WEST] = [-1, 0];

class Robot {
  constructor(data, inputValue) {
    this.data = data.slice();
    this.computer = new Computer(data, inputValue);
    this.position = [0, 0];
    this.paintedArea = {};
    this.facing = 0;
  }
  run() {
    while (!this.computer.isHalted) {
      const output = this.computer.run();
      if (this.computer.isHalted) break;
      if (output.length < 2) continue;
      const color = output.shift();
      const directionToRotate = output.shift();
      this.paintedArea[this.position] = color;
      this.rotate(directionToRotate);
      const nextColor = this.paintedArea[this.position] || 0;
      this.computer.inputValue = nextColor;
    }
    return Object.keys(this.paintedArea).length;
  }
  updatePosition() {
    const delta = deltas[this.facing];
    this.position[0] += delta[0];
    this.position[1] += delta[1];
  }
  rotateRight() {
    this.facing = (this.facing + 1) % 4;
    this.updatePosition();
  }
  rotateLeft() {
    this.facing = this.facing === 0 ? 3 : this.facing - 1;
    this.updatePosition();
  }
  rotate(directionToRotate) {
    if (directionToRotate) return this.rotateRight();
    return this.rotateLeft();
  }
  getPaintedArea() {
    const coords = Object.keys(this.paintedArea).map(c => c.split(','));
    const xCoords = coords.map(([x]) => x);
    const yCoords = coords.map(([, y]) => y);
    const xMin = Math.min(...xCoords);
    const xMax = Math.max(...xCoords);
    const yMin = Math.min(...yCoords);
    const yMax = Math.max(...yCoords);
    let paintedArea = '';
    for (let y = yMax; y >= yMin; y--) {
      for (let x = xMin; x <= xMax; x++)
        paintedArea += this.paintedArea[`${x},${y}`] ? '#' : ' ';
      paintedArea += '\n';
    }
    return paintedArea;
  }
}

module.exports = { Robot };
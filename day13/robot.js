const { Computer } = require('./computer');

class Robot {
  constructor(intCode, inputValue) {
    this.intCode = intCode.slice();
    this.computer = new Computer(intCode, inputValue);
    this.paintedArea = {};
    this.inputValue = 0;
    this.score = 0;
    this.ball = 0;
    this.paddle = 0;
    this.wall = 0;
    this.block = 0;
    this.ballCount = 0;
    this.paddleCount = 0;
    this.wallsCount = 0;
    this.blockTilesCount = 0;
  }

  paintPanel([x, y], output) {
    this.paintedArea[`${x},${y}`] = output;
  }

  update([x, y], output) {
    if (x === -1 && y === 0) this.score = output;
    else if (output === 1) {
      this.wallsCount++;
      this.wall = x;
    } else if (output === 2) {
      this.blockTilesCount++;
      this.block = x;
    } else if (output === 3) {
      this.paddleCount++;
      this.paddle = x;
    } else if (output === 4) {
      this.ballCount++;
      this.ball = x;
    }
    this.inputValue = Math.sign(this.ball - this.paddle);
  }

  run() {
    while (!this.computer.isHalted) {
      const output = this.computer.run();
      if (this.computer.isHalted) break;
      if (output.length < 3) continue;
      const x = output.shift();
      const y = output.shift();
      const color = output.shift();
      this.update([x, y], color);
      this.paintPanel([x, y], color);
      this.computer.inputValue = this.inputValue;
    }
    return { blockTilesCount: this.blockTilesCount, score: this.score };
  }
}

module.exports = { Robot };
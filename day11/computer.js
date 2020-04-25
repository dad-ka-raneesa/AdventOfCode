const sortByY = function(panel1, panel2) {
  return panel1.y > panel2.y ? 1 : panel1.y < panel2.y ? -1 : 0;
}

const createRow = function(row, colId) {
  if (row.length < 1) {
    row.push([colId]);
    return row;
  }
  if (row[row.length - 1][0].y === colId.y) {
    row[row.length - 1].push(colId);
    return row;
  }
  row.push([colId])
  return row;
}

const sortByX = function(panel1, panel2) {
  return panel1.x > panel2.x ? 1 : panel1.x < panel2.x ? -1 : 0;
}


class Computer {
  constructor(intCode) {
    this.intCode = intCode;
    this.pointer = 0;
    this.relativeBase = 0;
    this.currentPanel = { x: 0, y: 0, color: 1, direction: "UP" };
    this.outputs = [];
    this.paintedPanels = [];
  }

  get parseOpcode() {
    const opcode = "000000".concat(this.intCode[this.pointer]).slice(-5);
    return opcode.split('').map(num => +num);
  }

  getValue(pointer, mode) {
    if (mode == 0) {
      return this.intCode[this.intCode[pointer]];
    }
    if (mode == 1) {
      return this.intCode[pointer];
    }
    return this.intCode[this.relativeBase + this.intCode[pointer]];
  };

  getPosition(pointer, mode) {
    if (mode == 0) {
      return this.intCode[pointer];
    }
    if (mode == 1) {
      return this.intCode[pointer];
    }
    return this.relativeBase + this.intCode[pointer];
  }

  getLastPaintedColorOnSamePanel() {
    const alreadyPainted = this.paintedPanels.filter(panel => panel.x === this.currentPanel.x && panel.y === this.currentPanel.y);
    let color = 0;
    if (alreadyPainted != 0) {
      color = alreadyPainted.pop().color;
    }
    return color;
  }

  get panelPaintedOnceCount() {
    return this.paintedPanels.reduce((paintedOnce, paintedPanel) => {
      if (paintedOnce.length == 0) {
        paintedOnce.push(paintedPanel);
        return paintedOnce;
      }
      const alreadyPainted = paintedOnce.filter(panel => panel.x === paintedPanel.x && panel.y === paintedPanel.y);
      if (alreadyPainted == 0) {
        paintedOnce.push(paintedPanel);
      }
      return paintedOnce;
    }, []);
  }

  printRegistrationIdentifier() {
    const sortedY = this.panelPaintedOnceCount.sort(sortByY);
    const rows = sortedY.reduce(createRow, []);
    return rows.map(row => row.sort(sortByX).map(pos => {
      if (pos.color) {
        return "#";
      }
      if ((!pos.color) && pos.x) {
        return " "
      }
    }).join(""));
  }


  updateMoves() {
    if (this.outputs.length != 2) {
      return;
    }
    this.paintedPanels.push({ x: this.currentPanel.x, y: this.currentPanel.y, color: this.outputs[0] });
    const moves = {
      "UP": { x: 0, y: 1 },
      "RIGHT": { x: 1, y: 0 },
      "DOWN": { x: 0, y: -1 },
      "LEFT": { x: -1, y: 0 }
    }
    const directions = ["UP", "LEFT", "DOWN", "RIGHT"];

    const currentDirection = this.outputs[1] ? directions.indexOf(this.currentPanel.direction) + 3 : directions.indexOf(this.currentPanel.direction) + 1;
    this.currentPanel.direction = directions[currentDirection % 4];
    this.currentPanel.x += moves[this.currentPanel.direction].x;
    this.currentPanel.y += moves[this.currentPanel.direction].y;
    this.currentPanel.color = this.getLastPaintedColorOnSamePanel();
    this.outputs = [];
  }

  get isRunning() {
    return this.intCode[this.pointer] != 99;
  }

  get run() {
    while (this.isRunning) {
      let param1, param2, outputPosition;
      let [thirdParameterMode, param2Mode, param1Mode, notRequired, opcode] = this.parseOpcode;
      if (opcode != 3 && opcode != 4 && opcode != 9) {
        param1 = this.getValue(this.pointer + 1, param1Mode);
        param2 = this.getValue(this.pointer + 2, param2Mode);
        outputPosition = this.getPosition(this.pointer + 3, thirdParameterMode);
      }
      switch (opcode) {
        case 1:
          this.intCode[outputPosition] = param1 + param2;
          this.pointer += 4;
          break;
        case 2:
          this.intCode[outputPosition] = param1 * param2;
          this.pointer += 4;
          break;

        case 3:
          outputPosition = this.getPosition(this.pointer + 1, param1Mode);
          this.intCode[outputPosition] = this.currentPanel.color;
          this.pointer += 2;
          break;

        case 4:
          let output = this.getValue(this.pointer + 1, param1Mode);
          this.outputs.push(output);
          this.updateMoves();
          this.pointer += 2;
          break;

        case 5:
          this.pointer = param1 != 0 ? param2 : this.pointer + 3;
          break;

        case 6:
          this.pointer = param1 == 0 ? param2 : this.pointer + 3;
          break;

        case 7:
          this.intCode[outputPosition] = (param1 < param2) ? 1 : 0;
          this.pointer += 4;
          break;

        case 8:
          this.intCode[outputPosition] = (param1 == param2) ? 1 : 0;
          this.pointer += 4;
          break;

        case 9:
          this.relativeBase = this.getValue(this.pointer + 1, param1Mode) + this.relativeBase;
          this.pointer += 2;
          break;
      }
    }
  }
}

module.exports = { Computer };
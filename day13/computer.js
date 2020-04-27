class Computer {
  constructor(intCode) {
    this.intCode = intCode;
    this.pointer = 0;
    this.relativeBase = 0;
    this.outputs = [];
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
  get getOutputs() {
    return this.outputs;
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
          this.intCode[outputPosition] = 0;
          this.pointer += 2;
          break;
        case 4:
          let output = this.getValue(this.pointer + 1, param1Mode);
          this.outputs.push(output);
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
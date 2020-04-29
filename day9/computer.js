class Computer {
  constructor(data, inputValue) {
    this.data = data.slice();
    this.inputValue = inputValue;
    this.pointer = 0;
    this.relativeBase = 0;
    this.count = 0;
    this.outputs = [];
    this.isHalted = false;
    this.requiredParams = {
      '01': 3,
      '02': 3,
      '03': 1,
      '04': 1,
      '05': 2,
      '06': 2,
      '07': 3,
      '08': 3,
      '09': 1
    };
  }

  splitOpcode() {
    const opcode = this.data[this.pointer]
      .toString()
      .padStart(2, 0)
      .substr(-2);
    const fullOpcode = this.data[this.pointer]
      .toString()
      .padStart(this.requiredParams[opcode] + 2, 0);
    const modes = fullOpcode
      .substr(0, this.requiredParams[opcode])
      .split('')
      .reverse();
    return { opcode, modes };
  }

  getParams(opcode, modes) {
    const writableOperations = ['01', '02', '03', '07', '08'];
    const operands = [];
    for (let i = 0; i < modes.length; i++) {
      const condition =
        !writableOperations.includes(opcode) || i < modes.length - 1;
      let value = this.data[this.pointer + i + 1];
      if (modes[i] == 0 && condition) value = this.data[value];
      if (modes[i] == 2) {
        value = value + this.relativeBase;
        if (condition) value = this.data[value];
      }
      if (value === undefined) value = 0;
      operands.push(value);
    }
    const [operand1, operand2, outputPath] = operands;
    return { operand1, operand2, outputPath };
  }

  run() {
    while (this.pointer < this.data.length) {
      const { opcode, modes } = this.splitOpcode();
      const { operand1, operand2, outputPath } = this.getParams(opcode, modes);
      if (opcode == '99') {
        this.isHalted = true;
        break;
      }
      if (opcode == '01') {
        this.data[outputPath] = +operand1 + +operand2;
        this.pointer += 4;
      }
      if (opcode == '02') {
        this.data[outputPath] = +operand1 * +operand2;
        this.pointer += 4;
      }
      if (opcode == '03') {
        if (this.count == 0) {
          this.data[operand1] = this.inputValue;
        } else {
          this.data[operand1] = input2;
        }
        this.count++;
        this.pointer += 2;
      }
      if (opcode == '04') {
        this.pointer += 2;
        const output = this.data[operand1] ? this.data[operand1] : operand1;
        this.outputs.push(output);
        break;
      }
      if (opcode == '05') {
        this.pointer = operand1 != 0 ? operand2 : this.pointer + 3;
      }
      if (opcode == '06') {
        this.pointer = operand1 == 0 ? operand2 : this.pointer + 3;
      }
      if (opcode == '07') {
        this.data[outputPath] = operand1 < operand2 ? 1 : 0;
        this.pointer += 4;
      }
      if (opcode == '08') {
        this.data[outputPath] = operand1 == operand2 ? 1 : 0;
        this.pointer += 4;
      }
      if (opcode == '09') {
        this.relativeBase += operand1;
        this.pointer += 2;
      }
    }
    return this.outputs;
  }
}

module.exports = { Computer };
class Computer {
  constructor(data, inputValue) {
    this.data = data.slice();
    this.inputValue = inputValue;
    this.pointer = 0;
    this.count = 0;
    this.outputs = [];
    this.isHalted = false;
  }
  getParams() {
    const fullOpcode = this.data[this.pointer].toString().padStart(5, 0);
    let [, param2mode, param1mode, ...opcode] = fullOpcode.split('');
    opcode = opcode.join('');
    if (['03', '04'].includes(opcode)) [param1mode, param2mode] = [1, 1];
    let operand1 = this.data[this.pointer + 1];
    let operand2 = this.data[this.pointer + 2];
    let outputPath = this.data[this.pointer + 3];
    if (param1mode == 0) operand1 = this.data[operand1];
    if (param2mode == 0) operand2 = this.data[operand2];
    return [opcode, operand1, operand2, outputPath];
  };

  run(input2) {
    while (this.pointer < this.data.length) {
      const [opcode, operand1, operand2, outputPath] = this.getParams();
      if (opcode == '99') {
        this.isHalted = true;
        return this.outputs;
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
        this.outputs.push(this.data[operand1]);
        return this.outputs;
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
    }
    return this.outputs;
  }
}

module.exports = { Computer };
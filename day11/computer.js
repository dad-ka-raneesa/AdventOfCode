'use strict';

const ADD = '01'; // Add
const MUL = '02'; // Multiply
const INP = '03'; // Input
const OUT = '04'; // Output
const JIT = '05'; // Jump-if-true
const JIF = '06'; // Jump-if-false
const LTH = '07'; // Less Than
const EQU = '08'; // Equals
const URB = '09'; // Update relative base
const STP = '99'; // Stop

const POSITION_MODE = '0';
const IMMEDIATE_MODE = '1';
const RELATIVE_MODE = '2';

const pad = (number, size, padBy) => number.toString().padStart(size, padBy);

class Computer {
  constructor(data, inputValue) {
    this.pointer = 0;
    this.data = data.slice();
    this.isHalted = false;
    this.inputValue = inputValue;
    this.outputs = [];
    this.relativeBase = 0;
    this.operations = {
      [ADD]: {
        name: ADD,
        params: 3,
        perform: (a, b, c) => {
          this.data[c] = a + b;
          this.pointer += 4;
        },
        isWritingToData: true
      },
      [MUL]: {
        name: MUL,
        params: 3,
        perform: (a, b, c) => {
          this.data[c] = a * b;
          this.pointer += 4;
        },
        isWritingToData: true
      },
      [STP]: {
        name: STP,
        params: 1,
        perform: () => (this.isHalted = true),
        isWritingToData: false
      },
      [INP]: {
        name: INP,
        params: 1,
        perform: a => {
          this.data[a] = this.inputValue;
          this.pointer += 2;
        },
        isWritingToData: true
      },
      [OUT]: {
        name: OUT,
        params: 1,
        perform: a => {
          this.outputs.push(a);
          this.pointer += 2;
        },
        isWritingToData: false
      },
      [JIT]: {
        name: JIT,
        params: 2,
        perform: (a, b) => {
          this.pointer = a ? b : this.pointer + 3;
        },
        isWritingToData: false
      },
      [JIF]: {
        name: JIF,
        params: 2,
        perform: (a, b) => {
          this.pointer = !a ? b : this.pointer + 3;
        },
        isWritingToData: false
      },
      [LTH]: {
        name: LTH,
        params: 3,
        perform: (a, b, c) => {
          this.data[c] = a < b ? 1 : 0;
          this.pointer += 4;
        },
        isWritingToData: true
      },
      [EQU]: {
        name: EQU,
        params: 3,
        perform: (a, b, c) => {
          this.data[c] = a === b ? 1 : 0;
          this.pointer += 4;
        },
        isWritingToData: true
      },
      [URB]: {
        name: URB,
        params: 1,
        perform: a => {
          this.relativeBase += a;
          this.pointer += 2;
        },
        isWritingToData: false
      }
    };
  }
  parseOpcode() {
    let opcode = pad(this.data[this.pointer], 2, 0);
    const operation = this.operations[opcode.substr(-2)];
    opcode = pad(opcode, operation.params + 2, 0).split('');
    const modes = opcode.slice(0, operation.params).reverse();
    return { operation, modes };
  }
  getParams(operation, modes) {
    const operands = [];
    for (let i = 0; i < modes.length; i++) {
      const condition = !operation.isWritingToData || i < modes.length - 1;
      let value = this.data[this.pointer + i + 1];
      if (modes[i] === POSITION_MODE && condition) value = this.data[value];
      if (modes[i] === RELATIVE_MODE) {
        value = value + this.relativeBase;
        if (condition) value = this.data[value];
      }
      operands.push(value);
    }
    return operands;
  }
  run() {
    while (this.pointer < this.data.length) {
      const { operation, modes } = this.parseOpcode();
      const operands = this.getParams(operation, modes);
      operation.perform(...operands);
      if (operation.name === STP || operation.name === OUT) break;
    }
    return this.outputs;
  }
}

module.exports = { Computer };
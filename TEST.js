//part1 answer 16348437
const fs = require('fs');

const getParams = function(inputs, i) {
  const fullOpcode = inputs[i].toString().padStart(5, 0);
  let [, param2mode, param1mode, ...opcode] = fullOpcode.split('');
  opcode = opcode.join('');
  if (['03', '04'].includes(opcode)) [param1mode, param2mode] = [1, 1];
  let operand1 = inputs[i + 1];
  let operand2 = inputs[i + 2];
  let outputPath = inputs[i + 3];
  if (param1mode == 0) operand1 = inputs[operand1];
  if (param2mode == 0) operand2 = inputs[operand2];
  return [opcode, operand1, operand2, outputPath];
};

const changeInput = function(inputs, inputValue) {
  let i = 0;
  while (i < inputs.length) {
    const [opcode, operand1, operand2, outputPath] = getParams(inputs, i);
    if (opcode == 99) {
      return inputs;
    }
    if (opcode == 01) {
      inputs[outputPath] = +operand1 + +operand2;
      i += 4;
    }
    if (opcode == 02) {
      inputs[outputPath] = +operand1 * +operand2;
      i += 4;
    }
    if (opcode == 03) {
      inputs[operand1] = inputValue;
      i += 2;
    }
    if (opcode == 04) {
      console.log(inputs[operand1]);
      i += 2;
    }
    if (opcode == 05) {
      i = operand1 != 0 ? operand2 : i + 3;
    }
    if (opcode == 06) {
      i = operand1 == 0 ? operand2 : i + 3;
    }
    if (opcode == 07) {
      inputs[outputPath] = operand1 < operand2 ? 1 : 0;
      i += 4;
    }
    if (opcode == 08) {
      inputs[outputPath] = operand1 == operand2 ? 1 : 0;
      i += 4;
    }
  }
  return inputs;
}

const main = function() {
  let inputs = fs.readFileSync('./inputs/diagnosticProgramInput.txt', 'utf8').split(',');
  inputs = inputs.map(num => +num);
  changeInput(inputs, 5);
}

main();

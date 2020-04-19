//262086
const fs = require('fs');
const G = require("generatorics");
const { getParams } = require('./TEST');

const changeInput = function(inputs, input1, input2) {
  let i = 0;
  let count = 0;
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
      if (count == 0) {
        inputs[operand1] = input1;
      } else {
        inputs[operand1] = input2;
      }
      count++;
      i += 2;
    }
    if (opcode == 04) {
      i += 2;
      return (inputs[operand1]);
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

const handleCircuit = function(perm) {
  let inputs = fs.readFileSync('./inputs/amplifierInput.txt', 'utf8').split(',');
  inputs = inputs.map(num => +num);
  const amp1Output = changeInput(inputs.slice(), perm[0], 0);
  const amp2Output = changeInput(inputs.slice(), perm[1], amp1Output);
  const amp3Output = changeInput(inputs.slice(), perm[2], amp2Output);
  const amp4Output = changeInput(inputs.slice(), perm[3], amp3Output);
  const amp5Output = changeInput(inputs.slice(), perm[4], amp4Output);
  return amp5Output;
}

const main = function() {
  const outputs = [];
  for (var perm of G.permutation([0, 1, 2, 3, 4])) {
    outputs.push(handleCircuit(perm));
  }
  console.log(Math.max(...outputs));
}
main();
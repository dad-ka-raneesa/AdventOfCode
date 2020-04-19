//part1 answer 262086
const fs = require('fs');
const G = require("generatorics");
const { getParams } = require('./TEST');

const changeInput = function(inputs, input1, input2) {
  let i = 0;
  let count = 0;
  const outputs = [];
  while (i < inputs.length) {
    const [opcode, operand1, operand2, outputPath] = getParams(inputs, i);
    if (opcode == 99) {
      return outputs;
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
      outputs.push(inputs[operand1]);
      return outputs;
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
  return outputs;
}
const handleCircuit = function(inputs, perm) {
  const amp1Output = changeInput(inputs.slice(), perm[0], 0);
  const amp2Output = changeInput(inputs.slice(), perm[1], amp1Output.shift());
  const amp3Output = changeInput(inputs.slice(), perm[2], amp2Output.shift());
  const amp4Output = changeInput(inputs.slice(), perm[3], amp3Output.shift());
  const amp5Output = changeInput(inputs.slice(), perm[4], amp4Output.shift());
  return amp5Output.shift();
}

const main = function() {
  let inputs = fs.readFileSync('./inputs/amplifierInput.txt', 'utf8').split(',');
  inputs = inputs.map(num => +num);
  let maxOutput = 0;
  for (var perm of G.permutation([0, 1, 2, 3, 4])) {
    const output = handleCircuit(inputs, perm);
    maxOutput = output > maxOutput ? output : maxOutput
  }
  console.log(maxOutput);
}
main();
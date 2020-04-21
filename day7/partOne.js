//answer 262086
const fs = require('fs');
const G = require("generatorics");
const { handleCircuit } = require('./amplifierCircuit');

const main = function() {
  let inputs = fs.readFileSync('./day7/amplifierInput.txt', 'utf8').split(',');
  inputs = inputs.map(num => +num);
  let maxOutput = 0;
  for (var perm of G.permutation([0, 1, 2, 3, 4])) {
    const output = handleCircuit(inputs, perm);
    maxOutput = output > maxOutput ? output : maxOutput
  }
  console.log(maxOutput);
}
main()
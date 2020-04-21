//answer 5371621
const fs = require('fs');
const G = require("generatorics");
const { handleCircuit } = require('./amplifierCircuit');

const main = function() {
  let inputs = fs.readFileSync('./day7/amplifierInput.txt', 'utf8').split(',');
  inputs = inputs.map(num => +num);
  let maxOutput = 0;
  for (var perm of G.permutation([5, 6, 7, 8, 9])) {
    const output = handleCircuit(inputs, perm);
    maxOutput = output > maxOutput ? output : maxOutput
  }
  console.log(maxOutput);
}
main()
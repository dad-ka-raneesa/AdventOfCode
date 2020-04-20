//part1 answer 262086
//part2 answer 5371621
const fs = require('fs');
const G = require("generatorics");
const { Computer } = require('./computer');

const handleCircuit = function(inputs, perm) {
  const circuit = perm.map(phaseCode => new Computer(inputs, phaseCode));
  let computerPointer = 0;
  let lastOutput = 0;
  let currentComputer = circuit[computerPointer];
  while (!currentComputer.isHalted) {
    const output = currentComputer.run(lastOutput);
    if (currentComputer.isHalted) break;
    lastOutput = output.shift();
    computerPointer++;
    computerPointer %= circuit.length;
    currentComputer = circuit[computerPointer];
  }
  return lastOutput;
}

const main = function() {
  let inputs = fs.readFileSync('./inputs/amplifierInput.txt', 'utf8').split(',');
  inputs = inputs.map(num => +num);
  let maxOutput = 0;
  for (var perm of G.permutation([0, 1, 2, 3, 4])) {
    const output = handleCircuit(inputs, perm);
    maxOutput = output > maxOutput ? output : maxOutput
  }
  console.log('part one', maxOutput);
  maxOutput = 0;
  for (var perm of G.permutation([5, 6, 7, 8, 9])) {
    const output = handleCircuit(inputs, perm);
    maxOutput = output > maxOutput ? output : maxOutput
  }
  console.log('part two', maxOutput);
}
main()
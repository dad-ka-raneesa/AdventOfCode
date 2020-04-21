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

module.exports = { handleCircuit };

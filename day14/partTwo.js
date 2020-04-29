//answer 2910558
const fs = require('fs');
const { getReceipts, NanoFactory } = require('./spaceStoichiometry');

const main = function() {
  const input = fs.readFileSync('./day14/spaceStoichiometry.txt', 'utf8');
  let receipts = getReceipts(input);
  const nanoFactory = new NanoFactory(receipts);
  const totalOre = 1000000000000;
  const maxFuel = nanoFactory.getMaxFuelForOre(totalOre);
  console.log(maxFuel);
}

main();
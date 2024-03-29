//answer 443537
const fs = require('fs');
const { getReceipts, NanoFactory } = require('./spaceStoichiometry');

const main = function() {
  const input = fs.readFileSync('./day14/spaceStoichiometry.txt', 'utf8');
  let receipts = getReceipts(input);
  const nanoFactory = new NanoFactory(receipts);
  const ore = nanoFactory.getRequiredOresFor('FUEL', 1);
  console.log(ore);
}

main();
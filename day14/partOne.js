const fs = require('fs');
const { getReceipts } = require('./getReceipts');

const reaction = function(receipts, n) {
  let inventory = {};
  const triggerReaction = function(chemical, qty) {
    let ore = 0;
    let neededRatio = Math.ceil(qty / receipts[chemical].qty);
    receipts[chemical].reactives.forEach(reactive => {
      let newQty = reactive.qty * neededRatio;
      if (reactive.name == 'ORE') {
        ore += newQty;
      } else {
        inventory[reactive.name] = inventory[reactive.name] || 0;
        if (inventory[reactive.name] < newQty) {
          ore += triggerReaction(reactive.name, newQty - inventory[reactive.name]);
        }
        inventory[reactive.name] = inventory[reactive.name] - newQty;
      }
    });
    inventory[chemical] = (inventory[chemical] || 0) + (neededRatio * receipts[chemical].qty);
    return ore;
  }
  return triggerReaction('FUEL', n);
}

const main = function() {
  const input = fs.readFileSync('./day14/input.txt', 'utf8');
  let receipts = getReceipts(input);
  const ore = reaction(receipts, 1);
  console.log(ore);
}

main();
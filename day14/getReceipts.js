const getReceipts = function(input) {
  let receipts = {}
  for (let line of input.split('\n')) {
    let [reactives, chemicalOutput] = line.split('=>').map(v => v.trim());
    let [qty, chemical] = chemicalOutput.split(' ');
    reactives = reactives.split(',').map(reactive => {
      let [rQty, rName] = reactive.trim().split(' ');

      return { qty: +rQty, name: rName };
    })
    receipts[chemical] = { qty: +qty, reactives };
  }
  return receipts;
}

module.exports = { getReceipts };
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

class NanoFactory {
  constructor(receipts) {
    this.receipts = receipts;
    this.leftOvers = {};
  }

  initializeLeftOvers() {
    Object.keys(this.receipts).forEach(reactive => this.leftOvers[reactive] = 0);
  }

  calculateOre(chemical, amount) {
    if (chemical === 'ORE') return amount;
    const { qty, reactives } = this.receipts[chemical];
    const needToCreate = Math.max(amount - this.leftOvers[chemical], 0);
    const total = Math.ceil(needToCreate / qty);
    this.leftOvers[chemical] =
      qty * total + this.leftOvers[chemical] - amount;
    let oreCount = 0;
    if (needToCreate === 0) return oreCount;
    for (const reactive of reactives) {
      const result = this.calculateOre(reactive.name, total * reactive.qty);
      oreCount += result;
    }
    return oreCount;
  }

  getRequiredOresFor(chemical, amount) {
    this.initializeLeftOvers();
    return this.calculateOre(chemical, amount);
  }

  getMaxFuelForOre(totalOre) {
    let lowerBoundary = 0;
    let upperBoundary = totalOre;
    while (lowerBoundary < upperBoundary) {
      const midwayPoint = Math.floor((upperBoundary + lowerBoundary) / 2);
      const oreCount = this.getRequiredOresFor('FUEL', midwayPoint);
      if (oreCount < totalOre) lowerBoundary = midwayPoint + 1;
      if (oreCount > totalOre) upperBoundary = midwayPoint - 1;
      if (oreCount === totalOre) return midwayPoint;
    }
    return lowerBoundary;
  }
}

module.exports = { getReceipts, NanoFactory };
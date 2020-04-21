//answer 4900909
const fs = require('fs');

const calculateFuel = function(input, initialFuel) {
  let totalFuel = initialFuel;
  const fuel = Math.floor(input / 3) - 2;
  if (fuel <= 0) {
    return totalFuel;
  }
  totalFuel += fuel;
  return calculateFuel(fuel, totalFuel);
}


const getTotalFuel = function(inputs) {
  let totalFuel = 0;
  for (let i = 0; i < inputs.length; i++) {
    totalFuel += calculateFuel(inputs[i], 0)
  }
  return totalFuel;
}

const main = function() {
  const inputs = fs.readFileSync('./day1/inputMasses.txt', 'utf8').split('\n');
  const totalFuel = getTotalFuel(inputs)
  console.log(totalFuel);
}

main();


//answer 3269199
const fs = require('fs');

const getTotalFuel = function(inputs) {
  let totalFuel = 0;
  for (let i = 0; i < inputs.length; i++) {
    totalFuel += Math.floor(inputs[i] / 3) - 2;
  }
  return totalFuel;
}

const main = function() {
  const inputs = fs.readFileSync('./day1/inputMasses.txt', 'utf8').split('\n');
  const totalFuel = getTotalFuel(inputs)
  console.log(totalFuel);
}

main();

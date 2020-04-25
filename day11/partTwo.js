//answer AHCHZEBK
const fs = require('fs');
const { Computer } = require('./computer');

const main = function() {
  const intCode = fs.readFileSync("./day11/spacePolice.txt", "utf8").split(',').map(num => +num);
  const computer = new Computer(intCode.slice());
  computer.run;
  console.log(computer.printRegistrationIdentifier());
}

main();
//answer 22225
const fs = require('fs');
const { Robot } = require('./robot');

const main = function() {
  const intCode = fs.readFileSync("./day13/carPackage.txt", "utf8").split(',').map(num => +num);
  intCode[0] = 2;
  const robot = new Robot(intCode.slice(), 0);
  const { score } = robot.run();
  console.log(score);
}

main();
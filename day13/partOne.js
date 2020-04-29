//answer 432
const fs = require('fs');
const { Robot } = require('./robot');

const main = function() {
  const intCode = fs.readFileSync("./day13/carPackage.txt", "utf8").split(',').map(num => +num);
  const robot = new Robot(intCode.slice(), 0);
  const { blockTilesCount } = robot.run();
  console.log(blockTilesCount);
}

main();
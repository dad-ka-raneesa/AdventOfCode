//answer AHCHZEPK
const fs = require('fs');
const { Robot } = require('./robot');

const main = () => {
  const input = fs.readFileSync("./day11/spacePolice.txt", "utf8").split(',').map(num => +num);
  const robot = new Robot(input, 1);
  robot.run();
  const output = robot.getPaintedArea();
  console.log(output);
};

main();
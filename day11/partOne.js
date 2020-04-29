//answer 2184
const fs = require('fs');
const { Robot } = require('./robot');

const main = () => {
  const input = fs.readFileSync("./day11/spacePolice.txt", "utf8").split(',').map(num => +num);
  const robot = new Robot(input, 0);
  const output = robot.run();
  console.log(output);
};

main();
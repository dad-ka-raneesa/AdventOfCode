//answer 3765554916
const fs = require('fs');
const { Computer } = require('./computer');

const main = function() {
  let inputs = fs.readFileSync('./day9/BOOST.txt', 'utf8').split(',');
  inputs = inputs.map(num => +num);
  const computer = new Computer(inputs, 1);
  const outputs = computer.run(1);
  console.log(outputs.shift());
}

main();
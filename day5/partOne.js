//answer 16348437
const fs = require('fs');
const { changeInput } = require('./TEST');

const main = function() {
  let inputs = fs.readFileSync('./day5/TEST.txt', 'utf8').split(',');
  inputs = inputs.map(num => +num);
  changeInput(inputs, 1);
}

main();

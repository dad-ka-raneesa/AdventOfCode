//answer 2890696
const fs = require('fs');
const { changeInput } = require('./1202alarm');

const main = function() {
  let inputs = fs.readFileSync('./day2/1202alarmInput.txt', 'utf8').split(',');
  inputs = inputs.map(num => +num);
  inputs[1] = 12;
  inputs[2] = 2;
  const result = changeInput(inputs.slice());
  console.log(result[0]);
}

main(); 
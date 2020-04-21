//part2 answer 8226
const fs = require('fs');
const { changeInput } = require('./1202alarm');

const main = function() {
  let inputs = fs.readFileSync('./day2/1202alarmInput.txt', 'utf8').split(',');
  inputs = inputs.map(num => +num);
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      inputs[1] = i;
      inputs[2] = j;
      const result = changeInput(inputs.slice());
      if (result[0] == 19690720) {
        console.log(100 * (inputs[1]) + inputs[2]);
      }
    }
  }
}

main();
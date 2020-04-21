//answer 960
const { isPassedCredentials } = require('./discoverPassword');

const hadAnyDouble = function(digits) {
  let flag = false;
  for (let index = 0; index < digits.length - 1; index++) {
    flag = flag || digits[index] == digits[index + 1];
  }
  return flag;
}


const main = function() {
  let count = 0;
  const range = { start: 265275, end: 781584 };
  for (let i = range.start; i <= range.end; i++) {
    const { digits, result } = isPassedCredentials(i);
    if (result && hadAnyDouble(digits)) count++;
  }
  console.log(count);
}

main()
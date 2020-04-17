const hadAnyDouble = function(digits) {
  let flag = false;
  for (let index = 0; index < digits.length - 1; index++) {
    flag = flag || digits[index] == digits[index + 1];
  }
  return flag;
}

const areDigitsInIncreasingOrder = (digits) => {
  let flag = true;
  for (let index = 0; index < digits.length - 1; index++) {
    flag = flag && digits[index] <= digits[index + 1];
  }
  return flag;
}

const isPassedCredentials = function(num) {
  const sNum = num.toString();
  let digits = sNum.split('').map(digit => +digit);
  return areDigitsInIncreasingOrder(digits) && hadAnyDouble(digits);
}

const main = function() {
  let count = 0;
  const start = 265275;
  const end = 781584;
  for (let i = start; i <= end; i++) {
    if (isPassedCredentials(i)) count++;
  }
  console.log(count);
}

main();

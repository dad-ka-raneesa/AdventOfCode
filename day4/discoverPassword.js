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
  const result = areDigitsInIncreasingOrder(digits);
  return { digits, result };
}

module.exports = { isPassedCredentials };

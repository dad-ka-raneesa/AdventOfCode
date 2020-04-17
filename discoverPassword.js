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
  let digits = [];
  for (let i = 0; i < sNum.length; i++) {
    digits.push(sNum.charAt(i));
  }
  return areDigitsInIncreasingOrder(digits) && hadAnyDouble(digits);
}

const main = function() {
  let count = 0;
  const range = { start: 265275, end: 781584 };
  for (let i = range.start; i <= range.end; i++) {
    if (isPassedCredentials(i)) count++;
  }
  console.log(count);
}

main();

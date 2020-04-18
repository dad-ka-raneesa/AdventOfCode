//part1 answer 960
//part2 answer 626
const hadAnyDoubles = function(digits) {
  const count = digits.reduce(
    (context, element) => {
      if (!context.find(e => e[0] == element)) {
        context.push([element, 1]);
      } else {
        context.find(e => e[0] == element)[1] += 1;
      }
      return context;
    },
    [[0, 1]]
  );
  return count.some(e => e[1] == 2);
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
  return areDigitsInIncreasingOrder(digits) && hadAnyDoubles(digits);
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

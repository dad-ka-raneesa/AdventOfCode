//answer 626
const { isPassedCredentials } = require('./discoverPassword');
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

const main = function() {
  let count = 0;
  const start = 265275;
  const end = 781584;
  for (let i = start; i <= end; i++) {
    const { digits, result } = isPassedCredentials(i);
    if (result && hadAnyDoubles(digits)) count++;
  }
  console.log(count);
}

main();

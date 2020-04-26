// answer 392733896255168
const { Moon } = require('./moon');

const initMoons = function() {
  const io = new Moon({ x: 8, y: 0, z: 8 });
  const Europa = new Moon({ x: 0, y: -5, z: -10 });
  const Ganymede = new Moon({ x: 16, y: 10, z: -5 });
  const Callisto = new Moon({ x: 19, y: -10, z: -7 });
  return [io, Europa, Ganymede, Callisto];
}

const getCount = function(allMoons, element) {
  let index = 0;
  do {
    allMoons.forEach(moon => {
      moon.updateVelocity(allMoons);
    })
    allMoons.forEach(moon => moon.updatePosition());
    index++;
  }
  while (!(allMoons.every(moon => moon.pos[element] == moon.firstPos[element] && moon.vel[element] == 0)));
  return index;
}

const countSteps = function() {
  let allMoons = initMoons();
  const stepForX = getCount(allMoons, "x");
  allMoons = initMoons();
  const stepForY = getCount(allMoons, "y");
  allMoons = initMoons();
  const stepForZ = getCount(allMoons, "z");
  return [stepForX, stepForY, stepForZ];
}

const sortAscending = function(num1, num2) {
  return num1 > num2 ? 1 : num1 < num2 ? -1 : 0;
}

const findGcd = function(num1, num2) {
  return num2 == 0 ? num1 : findGcd(num2, num1 % num2)
}

const findLcm = function(num1, num2) {
  const mul = num1 * num2;
  const gcd = findGcd(num1, num2);
  return mul / gcd;
}

const main = function() {
  const stepsForXYZ = countSteps();
  const steps = stepsForXYZ.sort(sortAscending).reduce(findLcm, 1);
  console.log(steps);
}

main();
// answer 12490
const { Moon } = require('./moon');

const main = function() {
  const io = new Moon({ x: 8, y: 0, z: 8 });
  const Europa = new Moon({ x: 0, y: -5, z: -10 });
  const Ganymede = new Moon({ x: 16, y: 10, z: -5 });
  const Callisto = new Moon({ x: 19, y: -10, z: -7 });
  const allMoons = [io, Europa, Ganymede, Callisto];
  for (let index = 0; index < 1000; index++) {
    allMoons.forEach(moon => {
      moon.updateVelocity(allMoons);
    })
    allMoons.forEach(moon => moon.updatePosition());
  }
  const totalEnergy = allMoons.reduce((totalEnergy, moon) => totalEnergy + moon.energy, 0);
  console.log(totalEnergy);
}

main();
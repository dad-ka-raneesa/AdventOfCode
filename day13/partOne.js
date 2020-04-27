const fs = require('fs');
const { Computer } = require('./computer');

const getBlockTilesCount = function(outputs) {
  const tiles = [];
  let index = 0;
  while (index != outputs.length) {
    tiles.push({ x: outputs[index], y: outputs[index + 1], tile: outputs[index + 2] });
    index += 3;
  }
  return tiles.filter(currentTile => {
    return +currentTile.tile == 2
  });
}

const main = function() {
  const intCode = fs.readFileSync("./day13/carPackage.txt", "utf8").split(',').map(num => +num);
  const computer = new Computer(intCode.slice());
  computer.run;
  const outputs = computer.getOutputs;
  const blockTiles = getBlockTilesCount(outputs);
  console.log(blockTiles.length);
}

main();
//part1 answer 2048
const fs = require('fs');

const getCounts = function(counts, rows) {
  const countOf0 = rows.filter(x => x == 0).length;
  if (countOf0 < counts.count0) {
    counts.count0 = countOf0;
    counts.count1 = rows.filter(x => x == 1).length;
    counts.count2 = rows.filter(x => x == 2).length;
  }
  return counts;
}

const getMulOfCounts = function(pixels, width, height) {
  let counts = { count0: Infinity, count1: 0, count2: 0 };
  let index = 0;
  let lastIndex = 0
  while (index < pixels.length) {
    let layer = [];
    for (let j = 0; j < height; j++) {
      layer.push(pixels.slice(lastIndex, lastIndex + width));
      lastIndex += width;
    }
    counts = getCounts(counts, layer.flat());
    index += height * width;
  }
  return (counts.count1 * counts.count2);
}

const main = function() {
  const pixels = fs.readFileSync('./inputs/spaceImagePixels.txt', 'utf8').split('');
  const width = 25;
  const height = 6;
  const count = getMulOfCounts(pixels, width, height);
  console.log(count);
}

main();
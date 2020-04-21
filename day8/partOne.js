//answer 2048
const fs = require('fs');

const getCounts = function(counts, layer) {
  const countOf0 = layer.filter(x => x == 0).length;
  if (countOf0 < counts.count0) {
    counts.count0 = countOf0;
    counts.count1 = layer.filter(x => x == 1).length;
    counts.count2 = layer.filter(x => x == 2).length;
  }
  return counts;
}

const getMulOfCounts = function(pixels, width, height) {
  let counts = { count0: Infinity, count1: 0, count2: 0 };
  let currentIndex = 0;
  let lastIndex = 0;
  while (lastIndex < pixels.length) {
    lastIndex += width * height;
    counts = getCounts(counts, pixels.slice(currentIndex, lastIndex));
    currentIndex = lastIndex;
  }
  return (counts.count1 * counts.count2);
}

const main = function() {
  const pixels = fs.readFileSync('./day8/spaceImagePixels.txt', 'utf8').split('');
  const width = 25;
  const height = 6;
  const count = getMulOfCounts(pixels, width, height);
  console.log(count);
}

main();
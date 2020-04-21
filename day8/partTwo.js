//answer HFYAK
const fs = require('fs');

const visiblePixels = function(layers) {
  let visiblePixels = [];
  let pixel;
  for (let i = 0; i < layers[0].length; i++) {
    let layerCount = 0;
    pixel = layers[layerCount][i];
    while (pixel == 2 && layerCount < layers.length) {
      pixel = layers[layerCount][i];
      layerCount++;
    }
    visiblePixels.push(pixel);
  }
  return visiblePixels;
}

const getAllLayers = function(pixels, width, height) {
  let currentIndex = 0;
  let lastIndex = 0;
  let layers = [];
  while (lastIndex < pixels.length) {
    lastIndex += width * height;
    counts = layers.push(pixels.slice(currentIndex, lastIndex));
    currentIndex = lastIndex;
  }
  return layers;
}

const main = function() {
  const pixels = fs.readFileSync('./day8/spaceImagePixels.txt', 'utf8').split('');
  const width = 25;
  const height = 6;
  const layers = getAllLayers(pixels, width, height);
  const imagePixels = visiblePixels(layers);

  const image = imagePixels.reduce((image, n, i) => {
    if (i > 0 && i % width == 0) image += '\n';
    if (n == 1) image += '#';
    if (n == 0) image += ' ';
    return image;
  }, '');

  console.log(image);
}

main();
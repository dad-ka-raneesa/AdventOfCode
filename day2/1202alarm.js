const performOperation = function(inputs, dividedData) {
  const operation = dividedData[0];
  const operand1 = inputs[dividedData[1]];
  const operand2 = inputs[dividedData[2]];
  const outputAddress = dividedData[3];
  if (operation == 1) {
    inputs[outputAddress] = operand1 + operand2;
  }
  if (operation == 2) {
    inputs[outputAddress] = operand1 * operand2;
  }
}

const changeInput = function(inputs) {
  let dividedData = [];
  let count = 0;
  for (let i = 0; i < inputs.length; i++) {
    count++
    dividedData[i % 4] = inputs[i];
    if (count == 4) {
      if (dividedData[0] == 99) {
        return inputs;
      }
      performOperation(inputs, dividedData);
      count = 0;
      dividedData = [];
    }
  }
  return inputs;
}

module.exports = { changeInput };
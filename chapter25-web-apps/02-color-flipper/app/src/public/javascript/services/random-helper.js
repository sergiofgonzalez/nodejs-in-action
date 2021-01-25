function getRandomInt(exclusiveMax) {
  return Math.floor(Math.random() * Math.floor(exclusiveMax));
}

function getRandomHexStr(numBytes) {
  const hexBytes = [];
  for (let i = 0; i < numBytes; i++) {
    hexBytes.push(getRandomInt(256).toString(16));
  }

  return hexBytes.join('');
}

export { getRandomInt, getRandomHexStr };
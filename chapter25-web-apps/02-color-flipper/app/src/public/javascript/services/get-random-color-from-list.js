
import { getRandomInt } from './random-helper.js';

function getRandomColorFromList(colors) {
  if (!Array.isArray(colors)) {
    const errMsg = `ERROR: get-random-color-from-list: Invalid argument: colors is not an array`;
    console.log(errMsg);
    throw new Error(errMsg);
  }

  const colorIndex = getRandomInt(colors.length);
  return colors[colorIndex];
}

export default getRandomColorFromList;
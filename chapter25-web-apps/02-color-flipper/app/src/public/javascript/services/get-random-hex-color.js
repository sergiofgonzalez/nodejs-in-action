import { getRandomHexStr } from './random-helper.js';


function getRandomHexColor() {
  return `#${ getRandomHexStr(3) }`;
}

export default getRandomHexColor;
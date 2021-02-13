import { Matrix } from './lib/matrix.js';

const matrix3x3 = new Matrix([
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]);

for (const elem of matrix3x3) {
  console.log(elem);
}
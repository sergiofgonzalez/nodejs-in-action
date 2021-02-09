import { Matrix } from './matrix.js';

export class MatrixKeyValue extends Matrix {

  [Symbol.iterator]() {
    let nextRow = 0;
    let nextCol = 0;
    return {
      /* note that `next() : { ... }` will not bind `this` correctly */
      next: () => {
        if (nextRow === this.data.length) {
          return { done: true };
        }

        const currVal = this.data[nextRow][nextCol];
        const elemRowCol = `a_{${ nextRow + 1 }${ nextCol + 1 }}`;
        if (nextCol === this.data[nextRow].length - 1) {
          nextRow++;
          nextCol = 0;
        } else {
          nextCol++;
        }
        return { value: [ elemRowCol, currVal ] };
      }
    };
  }
}

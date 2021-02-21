import { createStack } from './lib/stack.js';

// const labyrinth = [
//   'I   X',
//   '   X ',
//   ' X  X',
//   '    E'
// ];

// const labyrinth = [
//   'I   X',
//   '   X ',
//   ' XX X',
//   '    E'
// ];

const labyrinth = [
  'I   X',
  '  XX ',
  ' X  X',
  '  X E'
];


class LabyrinthSolver {
  constructor(labyrinth) {
    this.labyrinth = this.getLabyrinthAsMatrix(labyrinth);
    this.numRows = this.labyrinth.length;
    this.numCols = this.labyrinth[0].length;
    this.entryPos = this.getEntryPos();
    this.exitPos = this.getExitPos();
    this.movements = createStack();
    this.currentPos = this.entryPos;
    this.labyrinth[this.entryPos.row][this.entryPos.col] = ' ';
    this.directions = ['N', 'E', 'S', 'W'];
    this.currentDirectionIndex = 0;
  }

  solve() {
    let done = false;

    this.labyrinth[this.entryPos.row][this.entryPos.col] = 'V';
    this.movements.push({...this.currentPos, dir: 0 });
    while (!done) {
      if (this.movements.isEmpty()) {
        done = true; // could not find exit
      } else {
        const { row, col, dir } = this.movements.peek();
        if (row === this.exitPos.row && col === this.exitPos.col) {
          done = true;
        } else {
          const{ nextRow, nextCol } = this.getNextPos(row, col, dir);
          if (this.isViablePos({row: nextRow, col: nextCol})) {
            this.labyrinth[nextRow][nextCol] = 'V';
            this.movements.push({ row: nextRow, col: nextCol, dir: 0 });
          } else {
            const { row, col, dir } = this.movements.pop();
            if (dir < this.directions.length - 1) {
              this.movements.push({ row, col, dir: dir + 1 });
            }
          }
        }
      }
    }

    this.labyrinth[this.entryPos.row][this.entryPos.col] = 'I';
    this.labyrinth[this.exitPos.row][this.exitPos.col] = 'E';
    if (this.movements.isEmpty()) {
      return false;
    } else {
      return true;
    }
  }


  getNextPos(row, col, dir) {
    let nextPos;
    let currentDir = this.directions[dir];
    if (currentDir === 'N') {
      nextPos = { nextRow: row - 1, nextCol: col };
    } else if (currentDir === 'E') {
      nextPos = { nextRow: row, nextCol: col + 1 };
    } else if (currentDir === 'S') {
      nextPos = { nextRow: row + 1, nextCol: col };
    } else if (currentDir === 'W') {
      nextPos = { nextRow: row, nextCol: col - 1};
    } else {
      throw new Error(`Unexpected coordinate received: ${ this.currentDir }`);
    }
    return nextPos;
  }

  isViablePos(candidatePos) {
    if (candidatePos.row < 0 || candidatePos.row >= this.numRows ||
      candidatePos.col < 0 || candidatePos.col >= this.numCols ||
      this.labyrinth[candidatePos.row][candidatePos.col] === 'X' ||
      this.labyrinth[candidatePos.row][candidatePos.col] === 'V') {
      return false;
    } else {
      return true;
    }
  }

  getLabyrinthAsMatrix(labyrinth) {
    const matrix = [];
    for (let i = 0; i < labyrinth.length; i++) {
      const row = [];
      for (let j = 0; j < labyrinth[i].length; j++) {
        row.push(labyrinth[i][j]);
      }
      matrix.push(row);
    }
    return matrix;
  }

  getEntryPos() {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        if (this.labyrinth[i][j].toUpperCase() === 'I') {
          return { row: i, col: j };
        }
      }
    }
  }

  getExitPos() {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        if (this.labyrinth[i][j].toUpperCase() === 'E') {
          return { row: i, col: j };
        }
      }
    }
  }

  toString() {
    let reprStr = '';

    /* first row */
    reprStr += '┌';
    reprStr += '─┬'.repeat(this.labyrinth[0].length - 1);
    reprStr += `─┐\n`;


    for (let row = 0; row < this.labyrinth.length; row++) {
      if (row !== 0) {
        reprStr += '├';
        reprStr += `─┼`.repeat(this.labyrinth[row].length - 1);
        reprStr += `─┤\n`;
      }

      for (const cell of this.labyrinth[row]) {
        reprStr += '│';
        if (cell.toLowerCase() === 'x') {
          reprStr += '▒';
        } else {
          reprStr += cell;
        }
      }
      reprStr += '│\n';
    }

    /* last row */
    reprStr += '└';
    reprStr += `─┴`.repeat(this.labyrinth[0].length - 1);
    reprStr += `─┘\n`;
    return reprStr;
  }

  printMovements() {
    console.log(this.movements.toString());
  }
}

function main() {
  const labyrinthSolver = new LabyrinthSolver(labyrinth);
  if (labyrinthSolver.solve()) {
    console.log(`Found the exit, we're saved!`);
    console.log(labyrinthSolver.toString());
    console.log(labyrinthSolver.printMovements());
  } else {
    console.log(`Couldn't find the exit, we're doomed!`);
    console.log(labyrinthSolver.toString());
    console.log(labyrinthSolver.printMovements());
  }
}


main();
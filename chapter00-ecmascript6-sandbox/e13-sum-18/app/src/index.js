'use strict';

const nums = [5, 6, 7, 8];
const ops = ['+', '-', '*', '/'];
const validOpPositions = [[2, 4, 6], [3, 4, 6], [4, 5, 6]];


function getCombinations(permutation) {
  var length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

function cartesian(...args) {
  var r = [], max = args.length - 1;
  function helper(arr, i) {
    for (var j = 0, l = args[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      if (i == max)
        r.push(a);
      else
        helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}


const numCombinations = getCombinations(nums);
const opCombinations = cartesian(ops, ops, ops);
let idx = 0;
for (const numCombo of numCombinations) {
  for (const opCombination of opCombinations) {
    for (const opPosition of validOpPositions) {
      if (idx == 297)
        console.log('now');
      let opString = '';
      const opCombo = Array.from(opCombination);
      const candidate = [Array.from(numCombo), Array.from(opCombo), Array.from(opPosition)];
      const stack = [];
      let k = 0;
      for (let i = 0; i < numCombo.length + 3; i++) {
        if (i == opPosition[k]) {
          const num2 = stack.pop();
          const num1 = stack.pop();
          const op = opCombo.pop();
          k++;
          switch (op) {
            case '+':
              stack.push(num1 + num2);
              opString += `+ `;
              break;
            case '-':
              stack.push(num1 - num2);
              opString += `- `;
              break;
            case '*':
              stack.push(num1 * num2);
              opString += `* `;
              break;
            case '/':
              stack.push(Math.floor(num1 / num2));
              opString += `/ `;
              break;
          }
        }
        if (i < numCombo.length) {
          stack.push(numCombo[i]);
          opString += `${ numCombo[i] } `;
        }
      }
      const result = stack.pop();
      if (result === 18) {
        console.log(idx, opString, candidate);

        // process.exit(1);
      } else {
        // console.log(`It didn't work: `, idx, candidate, result);
      }
      idx++;
    }
  }
}

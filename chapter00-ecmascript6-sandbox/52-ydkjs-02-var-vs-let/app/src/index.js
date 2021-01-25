'use strict';

/* var attaches itself to the nearest enclosing function scope */
function diff(x, y) {
  if (x > y) {
    var tmp = x;
    x = y;
    y = tmp;
  }
  console.log(`tmp: ${ tmp }`); /* no prob: tmp is function-scoped */
  return y - x;
}

console.log(diff(5, 10));
console.log(diff(10, 5));

/* var attaches itself to the nearest enclosing function scope */
function diffWithLet(x, y) {
  if (x > y) {
    let tmp = x;
    x = y;
    y = tmp;
  }
  // console.log(`tmp: ${ tmp }`); /* oops: tmp is no longer function-scoped */
  return y - x;
}

console.log(diffWithLet(5, 10));
console.log(diffWithLet(10, 5));


for (var i = 1; i < 5; i++) {
  console.log(String(i).padStart(2, '0'));
}
console.log(i); /* ok, i is attached to the global scope */

for (let j = 1; j < 5; j++) {
  console.log(String(i).padStart(3, '0'));
}
// console.log(j); /* oops: j is no longer attached to the global scope */


/* the good wat to check the last used variable in for loop */
var lastI;

for (let i = 0; i < 5; i++) {
  lastI = i;
  if (mustBreak(i)) {
    break;
  }
}

if (lastI < 5) {
  console.log(`We broke out of the loop early`);
}

function mustBreak(num) {
  if (num == 3) {
    return true;
  } else {
    return false;
  }
}

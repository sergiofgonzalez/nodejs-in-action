/* eslint-disable no-unused-vars */
'use strict';

/* 
  test clauses perform an implicit value comparison 
  according to the following mental model:
  if (Boolean(x) === true) { ... }
*/ 

let x;

/* case 1 */
x = 1;
if (x) {
  console.log(`if body will be run`);
}
console.log(`=============`);

/* case 2 */
while (x) {
  console.log(`running while one time`);
  x = false;
}
console.log(`=============`);

/* case 3 */
x = 1;
if (x == true) {
  console.log(`if body will run`);
}
console.log(`=============`);

/* case 4 */
while (x == true) {
  console.log(`running while one time`);
  x = false;  
}
console.log(`=============`);

/* case 5 */
x = 'hello';
if (x) {
  console.log(`if body will run`);
}

if (Boolean(x) == true) {
  console.log(`if body will not run`);
}
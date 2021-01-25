'use strict';

/* Example 1: Copying is not accessing */
// // eslint-disable-next-line no-unused-vars
// var special = 42;

// function lookingFor(special) {
//   var another = { special: special }; // another = { special: 112...}

//   function keepLooking() {
//     var special = 3.141592;
//     console.log(special);  // 3.14
//     console.log(another.special); // 112
//   }

//   keepLooking();
// }

// lookingFor(112358132134);

/* Example 2: Hoisting in action*/
// greeting = 'Hello';
// console.log(greeting);  // Hello

// var greeting = 'Howdy';
// console.log(greeting);  // Howdy


/* Example 3: the Temporal Dead Zone in Action*/
// eslint-disable-next-line no-unused-vars
// var studentName = 'Kyle';

// {
//   console.log(studentName); // Throws error: cannot access `studentName` before initialization

//   let studentName = 'Suzy';
//   console.log(studentName);
// }

/* Example 4: No TDZ for var */

// Case 1: No redeclaration allowed
// var studentName = 'Kyle';

// {
//   console.log(studentName); // Throws error: cannot access `studentName` before initialization

//   var studentName = 'Suzy'; // No redeclaration allowed
//   console.log(studentName);
// }

// Case 2: definition order: no TypeError, there's no TDZ for vars */

console.log(studentName);

var studentName = 'Suzy';
console.log(studentName);


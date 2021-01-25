/* eslint-disable no-unused-vars */
'use strict';

/* Anonymous function expression */
const awesomeFunction = function (coolMessage) {
  coolMessage = 'Hello to Jason Isaacs!';
  return coolMessage;
};

// JavaScript does name inference in anonymous function expressions
console.log(`awesomeFunction.name=${ awesomeFunction.name }`);

function greeting() {
  console.log('Hi!');
}

const sayHiFn = function sayHi() {
  console.log('Hi!');
};

console.log(`greeting.name = ${ greeting.name }`);
console.log(`sayHiFn.name = ${ sayHiFn.name }`);

/* 
  An anonymous function does not have an identifier,
  which prevents (for example) to refer to the function
  from itself.
*/

const anonymousFn = function (num) {
  if (num === 1) 
    return 1;
  /* oops: can't call myself */  
};


/* all types of function forms as of ES2020 */
function one() {}
function *two() {}
async function three() {}
async function *four() {}
(function() {})();
(function namedIIFE(){})();
(async function(){})();
(async function asyncNamedIIFE(){})();

let f;
async function doSomethingAsync() { return 1; }
function someOperation(fn) { fn(); }
f = () => 42;
f = x => x * 2;
f = (x) => x * 2;
f = (x, y) => x * y;
f = x => ({ x: x * 2});
f = x => { return x * 2; };
f = async x => { 
  let y = await doSomethingAsync(x);
  return y * 2;
};
someOperation(x => x * 2);

/* Functions in classes are called methods */
class SomeClass {
  coolMethod() { }
  someOtherMethod() { }
}

const objInstance = {
  coolMethod() { },
  oldSchoolDef: function() { }
};
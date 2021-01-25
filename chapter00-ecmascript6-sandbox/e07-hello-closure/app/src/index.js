'use strict';

/* The simplest example: using closures to protect variables from outside manipulation */

function tallyCounter() {
  let total = 0;

  return function count() {
    total++;
    return total;
  };
}

const countFn = tallyCounter();
console.log(countFn());
console.log(countFn());
console.log(countFn());


/* another use: defer code execution but using values from the past */

function logTheDateFromBefore(delayMillis) {
  const date = new Date();

  function logDate() {
    console.log(`current: ${ new Date().toISOString() }, past: ${ date.toISOString() }`);
  }

  setTimeout(logDate, delayMillis);
}

logTheDateFromBefore(30000);


function outer() {
  const outerVar = 'Hello';

  function closure() {
    const innerVar = 'Jason Isaacs';
    console.log(`${ outerVar } to ${ innerVar }`);
  }

  closure();
}

outer();

/* The closure do not see `this` */
let person = {
  name: 'Jason Isaacs',
  greet: function() {
    return function() {
      return `Hello to ${ this.name }`;
    };
  }
};

try {
  person.greet()();
} catch (err) {
  console.log(`Error: ${ err.message }`);
}


/* so you either use self or bind */
let personSelf = {
  name: 'Jason Isaacs',
  greet: function() {
    const self = this;
    return function() {
      return `Hello to ${ self.name }`;
    };
  }
};

console.log(personSelf.greet()());


const personBind = {
  name: 'Jason Isaacs',
  greet: function() {
    const self = this;
    return function() {
      return `Hello to ${ self.name }`;
    }.bind(this);
  }
};

console.log(personBind.greet()());

/* this works better with anonymous arrow functions */

const personArrow = {
  name: 'Jason Isaacs',
  greet: function() {
    return () => {
      return `Hello to ${ this.name }`;
    };
  }
};

console.log(personArrow.greet()());
"use strict";

/* 
  A simple use case for apply:
    call a function or other depending on some run-time values
    passing a given this object

    Note that this can be done also using regular syntax
*/
function sayHello(name) {
  console.log(`Hello to ${ name }!`);
}

function sayGoodbye(name) {
  console.log(`Good bye to ${ name }!`);
}

const functions = [ sayHello, sayGoodbye ];

const fnIndex = Math.floor(Math.random() * 2);

functions[fnIndex].apply(this, ["Jason Isaacs"]);

functions[fnIndex]("Idris Elba");

/*
  A simple use case for bind:
    Bind creates a wrapper around a function with a set of arguments and 
    a particular `this` object.
    Note that this also works without bind as well
*/
class TimeBomb {
  constructor() {
    this.message = "Boom!";
  }

  explode() {
    console.log(this.message);
  }
}

const bomb = new TimeBomb();
setTimeout(bomb.explode.bind(bomb), 1000);
setTimeout(() => bomb.explode(), 2000);

/*
  Another simple use case for bind:
    Bind creates a partially applied function, and as such
    can be used to inject parameters
*/
function showArguments(...args) {
  console.log(args);
}

const boundWithLeadingZero = showArguments.bind(this, 0);


showArguments(1, 2, 3);
boundWithLeadingZero(1, 2, 3);
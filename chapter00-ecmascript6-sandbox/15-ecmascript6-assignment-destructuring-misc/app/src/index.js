"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;


/* case 1: making explicit declaration of variables we need when using functions */
function getComplexObject() {
  return {
    num: 5,
    word: "hello",
    bool: true,
    fn: () => console.log(`hello`)
  };
}

const {num, word} = getComplexObject();
console.log(`num=${num}; word=${word}`);


/* case 2: providing default values to functions */
function getRandomBetween({min = 1, max = 6} = {}) {
  return Math.floor(Math.random() * (max - min) + min);
}

console.log(`getRandomBetween()=${getRandomBetween()}`);
console.log(`getRandomBetween({min: 5 })=${getRandomBetween({min: 5})}`);
console.log(`getRandomBetween({min: 5, max: 100})=${getRandomBetween({min: 5, max: 100})}`);

/* case 3: getting results from regEx */
function splitDate(date = "1970-01-01") {
  const rdate = /(\d+).(\d+).(\d+)/;
  return rdate.exec(date);
}

const result = splitDate();
console.log(`result=${result}`);

// this is much clearer
const [, year, month, day] = splitDate("1974-02-05");
console.log(`${day} of ${month}, ${year}`);

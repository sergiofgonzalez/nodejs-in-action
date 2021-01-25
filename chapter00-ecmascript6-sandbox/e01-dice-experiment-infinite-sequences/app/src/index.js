"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

const dice = {
  [Symbol.iterator]: () => ({
    next: () => ({
      done: false,
      value: Math.floor(Math.random() * 6 + 1)
    })
  })
};

let results = initializeResults(1);
runExperiment(100000, 1);
printResults();
console.log("==========================");

// Now with two dices
results = initializeResults(2);
runExperiment(100000, 2);
printResults();
console.log("==========================");



function initializeResults(numDice) {
  const results = {};
  for (let i = 1; i <= numDice * 6; i++) {
    results[i] = 0;
  }
  results.total = 0;
  return results;
}

function runExperiment(numThrows = 1000, numDice = 1) {
  for (let i = 0; i < numThrows; i++) {
    let currentThrow = 0;
    for (let j = 0; j < numDice; j++) {
      let [currentOneDice] = dice;
      currentThrow += currentOneDice;
    }
    results[currentThrow]++;
    results.total++;
  }
}

function printResults() {
  const maxStars = 50;
  console.log("Results:");
  for (let prop in results) {
    const numStars = (maxStars / results.total) * results[prop];
    let stars  = "";
    if (prop !== "total") {
      for (let i = 0; i < numStars; i++) {
        stars += "*";
      }
    }

    console.log(`${ prop }: ${ results[prop] } ${ stars } ${ Math.round((results[prop] / results.total) * 100) }%`);
  }
}
"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

const answers = [
  `It is certain`,
  `Yes definitely`,
  `Most likely`,
  `Yes`,
  `Ask again later`,
  `Better not tell you now`,
  `Cannot predict now`,
  `Don't count on it`,
  `My sources say no`,
  `Very doubtful`
];

function answer() {
  return answers[Math.floor(Math.random() * answers.length)];
}

/* sync */

function ball(questions) {
  for (let question of questions()) {
    console.log(`[q] ${ question }`);
    console.log(`[a] ${ answer() }`);
  }
}

ball(function* questions() {
  yield "Will JavaScript fall out of grace?";
  yield "How do you know that?";
});

/* async:
  + let's assume that the questions are fetched remotely via HTTP
    and therefore, all we get when calling fetchAnswer is a promise
  + This first implementation has got a problem:
    The consume does not have control over how the answers ar used.
*/

console.log("================");

function fetchAnswer() {
  return Promise
          .resolve(answer());
}

function asyncBall(questions) {
  const g = questions();
  ask();

  function ask() {
    const question = g.next();
    if (question.done) {
      return;
    }
    fetchAnswer()
      .then(answer => {
        console.log(`[q] ${ question.value }`);
        console.log(`[a] ${ answer }`);
        ask();
      });
  }
}

asyncBall(function* questions() {
  yield "Will JavaScript fall out of grace?";
  yield "How do you know that?";
});

/* async v2:
  + let's assume that the questions are fetched remotely via HTTP
    and therefore, all we get when calling fetchAnswer is a promise
  + This first implementation has got a problem:
    The consume does not have control over how the answers ar used.
*/
console.log("================");

function asyncBallv2(questions) {
  const g = questions();
  let question = g.next();
  ask();

  function ask() {
    if (question.done) {
      return;
    }
    fetchAnswer()
      .then(answer => {
        question = g.next(answer);
      })
      .then(ask);
  }
}

asyncBallv2(function* questions() {
  console.log(`[a-1] ${ yield "Will JavaScript fall out of grace?" }`);
  console.log(`[a-2] ${ yield "How do you know that?" }`);
});

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

/*
  v0: blindly return answers
*/
function* ballv0() {
  while (true) { // eslint-disable-line no-constant-condition
    yield `[a] ${ answer() }`;
  }
}

let g = ballv0();
console.log(g.next());
console.log(g.next());

/*
  v1: accept questions

  + the first call to next will execute the body of the generator function until the yield statement
     => this will leave question undefined in the first call
     => the values "000" and "001" will be printed
  + the second call will resume the execution of the body of the generator function, replacing
    the yield statement where the execution was paused with the argument from next.
     => execution will resume, printing "002" and the console.log
     => at that point question will contain the argument passed to next
     => then "003" and "001" will be printed
     => then the value will be yielded as the result of calling `answer()` and the execution will be suspended again
*/
function* ballv1() {
  console.log(`000`);
  let question;
  while (true) { // eslint-disable-line no-constant-condition
    console.log(`001`);
    question = yield `[a] ${ answer() }`;
    console.log(`002`);
    console.log(`[q] ${ question }`);
    console.log(`003`);
  }
  // console.log(`005`); // unreachable code
}

g = ballv1();
g.next(); // bootstrapping call, won't produce any result

console.log(g.next("Will JavaScript fall out of grace?").value);

/* 
  We could have made a simpler to understand implementation:
  + first g.next(), call will just reach question = yield; line, nothing will be returned
  + second g.next(param), will make question =  param, print the question and answer
*/
console.log("=================");
function* ballv2() {
  let question;
  while (true) { // eslint-disable-line no-constant-condition
    question = yield; 
    console.log(`[q] ${ question }`);
    console.log(`[a] ${ answer() }`);
  }
}

g = ballv2();
g.next();
g.next("Will JavaScript fall out of grace?");
g.next("Are you sure?");


/*
  let's improve the implementation

  + we'd like the client to provide a generator function that
    provides the questions, while the ball function keeps control
    the iteration and provides the answers

    ball(function* questions() {
      yield "Will JavaScript fall out of grace?";
      yield "Are you sure"
    });
*/
console.log("==================");
function ballv3(questions) {
  for (let question of questions()) {
    console.log(`[q] ${ question }`);
    console.log(`[a] ${ answer() }`);
  }
}

ballv3(function* questions() {
  yield "Will JavaScript fall out of grace?";
  yield "Are you sure?";
});


/*
  We can improve the latest implementation a little bit
  by turning the ball function into a generator itself
*/
console.log("=============");
function* ballv4(questions) {
  for (let question in questions()) {
    yield [`[q] ${ question }`, `[a] ${ answer() }`];
  }
}

/* now the client should use the function like this */
function* questions() {
  yield "Will JavaScript fall out of grace?";
  yield "How do you know that?";
}

for (let [q, a] of ballv4(questions)) {
  console.log(q);
  console.log(a);
}

'use strict';

/* scope is static, execution context is dynamic */
function classroom(teacher) {
  return function study() {
    // teaches is part of scope, this.topic is part of the execution context
    console.log(`${ teacher } says to study ${ this.topic }`);
  };
}

const assignment = classroom('Kyle');

// assignment(); // no this.topic defined on the execution context, so it'll fail

const homework = {
  topic: 'Maths',
  assignment
};

homework.assignment(); // now assignment() can find an execution context on which this.topic is defined

/* scope can also be provided through `Function.call` */
const otherHomework = {
  topic: 'Programming'
};

assignment.call(otherHomework);
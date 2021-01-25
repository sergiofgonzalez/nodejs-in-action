'use strict';


function throttle(fn, milliseconds) {
  let lastCallTime;

  return function(...args) {
    const nowTimestamp = new Date();

    if (!lastCallTime || lastCallTime <= nowTimestamp - milliseconds) {
      lastCallTime = nowTimestamp;
      fn(...args);
    } else {
      console.log(`=== missed: last=${ lastCallTime.toISOString() }; now=${ nowTimestamp.toISOString() }; delay=${ milliseconds }`);
    }
  };
}

function sayHello(name = 'Jason Isaacs') {
  console.log(`Hello to ${ name } @ ${ new Date().toISOString() }`);
}

/* unthrottled version */
for (let i = 0; i < 10; i++) {
  sayHello();
}
console.log('=====');

/* throttled version */
const throttledSayHello = throttle(sayHello, 2); // can only be called every 2 ms
for (let i = 0; i < 10; i++) {
  throttledSayHello('Idris Elba');
}


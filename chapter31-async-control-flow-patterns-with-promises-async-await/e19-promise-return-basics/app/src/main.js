/* eslint-disable no-unused-vars */
function asyncNum(num) {
  return new Promise(resolve => {
    process.nextTick(() => {
      resolve(num);
    });
  });
}

function buggyAsyncNum(num) {
  /* buggy because promise never settles */
  return new Promise(resolve => {
    process.nextTick(() => {
      return num;
    });
  });
}

function buggyAsyncNum2(num) {
  /* buggy because promise is not returned */
  const p = new Promise(resolve => {
    process.nextTick(() => {
      return num;
    });
  });
}

/* Scenario 0: asyncNum works without multiple chaining */
// asyncNum(5)
//   .then((result) => console.log(`result: ${ result }`));

/* Scenario 1: asyncNum works with multiple chaining when returning on then */
/*
asyncNum(5)
  .then(result => {
    console.log(`result: ${ result }`);

    // we need to return something from this `then()`
    // if we want to send some data to the next `then()`
    return asyncNum(result + 1);
  })
  .then(data => console.log(`data: ${ data }`));
*/

/* Scenario 2: asyncNum works, but we forget to return from then() */
/*
asyncNum(5)
  .then(result => {
    console.log(`result: ${ result }`);
    // we need to return something from this `then()`
    // if we want to send some data to the next `then()`
    // otherwise, data will be undefined
  })
  .then(data => console.log(`data: ${ data }`));
*/

/* Scenario 3: buggy because initial promise never settled */
/*
buggyAsyncNum(5)
  .then(result => {
    // this will never execute as resolve is never called!
    console.log(`result: ${ result }`);
  })
  .finally(() => {
    // this won't execute either as promise is never settled
    console.log('finally!');
  });
*/

/* Scenario 4: buggy because initial promise doesn't return a promise */
// this will fail with:
//  cannot read propert 'then' of undefined because the function
// doesn't return a promise
// buggyAsyncNum2(5)
//   .then(result => {
//     // this will never execute as resolve is never called!
//     console.log(`result: ${ result }`);
//   })
//   .finally(() => {
//     // this won't execute either as promise is never settled
//     console.log('finally!');
//   });

/* Scenario 5: `then()` will synchronously return a Promise */
// this means that we can always chain multiple then, no matter
// what we do in the body of the `then()` callback (whether we
// return a value or a promise or don't return anything at all)
Promise.resolve(5)
  .then((num) => {
    // we return a value in the callback body,
    // so that value will be received by the callback
    // of the next then as an argument
    return num + 1;
  })
  .then((data) => {
    // we return a promise in the callback body
    // so the next then() will be invoked when
    // this promise is settled, with the settlement value
    console.log(`seconds (then returning promise): ${ new Date().getSeconds() }`);
    return new Promise(resolve => {
      setTimeout(() => resolve(data + 1), 2 * 1000);
    });
  })
  .then((data) => {
    console.log(`data=${ data }; seconds (returned promise settled): ${ new Date().getSeconds() }`);
    // we don't return anything in the callback body
    // and yet, we can chain because then return a promise synchronously
  })
  .then((data) => {
    console.log(`Nothing received but works: ${ data }`);
  });
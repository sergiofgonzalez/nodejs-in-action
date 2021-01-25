'use strict';

function doSomethingPromise() {
  const apples = [ 'Granny Smith', 'Macintosh'];
  const meals = ['Lasagna'];

  // promise-based: returning single object with two properties
  return Promise.resolve({ apples, meals });
}

function doSomethingPromisev2() {
  const apples = [ 'Granny Smith', 'Macintosh'];
  const meals = ['Lasagna'];

  // promise-based: returning two objects
  return Promise.resolve(apples, meals);
}


function doSomethingCallback(cb) {
  setTimeout(() => {
    const apples = [ 'Granny Smith', 'Macintosh'];
    const meals = ['Lasagna'];

    // callback-based: returning single object with two properties
    cb(null, { apples, meals });
  });
}

function doSomethingCallback2(cb) {
  setTimeout(() => {
    const apples = [ 'Fuji', 'Pink Lady'];
    const meals = ['Paella'];

    // callback-based: returning two objects
    cb(null, apples, meals);
  });
}

function doSomethingDirectStyle() {
  const apples = [ 'Gala', 'Honeycrisp'];
  const meals = ['Veg Pulao'];

  // direct-style: returning object with two properties
  return { apples, meals };
}

/* DIRECT-STYLE */
const { apples, meals } = doSomethingDirectStyle();
console.log(`========= DIRECT
Apples: ${ apples}
Meals: ${ meals }\n`);

/* CALLBACKS */
doSomethingCallback((err, result) => {
  const { apples, meals } = result;
  console.log(`========= CALLBACK-BASED (one object)
  Apples: ${ apples}
  Meals: ${ meals }\n`);
});

doSomethingCallback2((err, apples, meals) => {
  console.log(`========= CALLBACK-BASED (two objects)
  Apples: ${ apples}
  Meals: ${ meals }\n`);
});

doSomethingPromise()
  .then(result => {
    const { apples, meals } = result;
    console.log(`========= PROMISE-BASED (single object, destructuring in '.then' body)
    Apples: ${ apples}
    Meals: ${ meals }\n`);
  });

doSomethingPromise()
  .then(({ apples, meals }) => {
    console.log(`========= PROMISE-BASED (single object, destructuring on signature)
    Apples: ${ apples}
    Meals: ${ meals }\n`);
  });

doSomethingPromisev2()
  .then((apples, meals) => {
    console.log(`========= PROMISE-BASED (two objects)
    Apples: ${ apples}
    Meals: ${ meals }\n`);
  });
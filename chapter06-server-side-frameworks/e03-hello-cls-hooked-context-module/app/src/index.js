'use strict';

const context = require('./lib/context');
const workload = require('./lib/workload');


function doSomething() {
  context.run(() => {
    console.log(`0: From doSomething context.get('myValue') = ${ context.get('myValue') }`);
    context.set('myValue', 5);
    
    workload('doSomething');

  });
}

function doSomeOtherThing() {
  context.run(() => {
    console.log(`0: From doSomeOtherThing context.get('myValue') = ${ context.get('myValue') }`);
    context.set('myValue', 99);
    
    workload('doSomeOtherThing');
  });
}

function doEvenMoreThings(instanceId, initialValue) {
  const instanceName = `doEvenMoreThings-${ instanceId }`;
  context.run(() => {
    context.set('initialValue', initialValue);
    console.log(`0: ${ instanceName }: context.get('myValue') = ${ context.get('myValue') }`);
    console.log(`1: ${ instanceName }: context.get('initialValue') = ${ context.get('initialValue') }`);
    context.set('myValue', 99);

    context.set('initialValue', getRandomInt(100));
    console.log(`2: ${ instanceName }: context.get('initialValue') = ${ context.get('initialValue') }`);
    
    workload(instanceName);
    setTimeout(() => console.log(`6: ${ instanceName }: context.get('initialValue') = ${ context.get('initialValue') }`), 5000);
  });
}

setTimeout(doSomething, 0);
setTimeout(doSomeOtherThing, 0);
// setTimeout(() => doEvenMoreThings(1, getRandomInt(3)), 0);

for (let i = 0; i < 3; i++) {
  setTimeout(() => doEvenMoreThings(i, getRandomInt(3)), 0);
}


function getRandomInt(maxExclusive) {
  return Math.floor(Math.random() * Math.floor(maxExclusive));
}
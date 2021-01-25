'use strict';

const createNamespace = require('cls-hooked').createNamespace;
const context = createNamespace('myContext');



function doSomething() {
  context.run(() => {
    console.log(`0: From doSomething context.get('myValue') = ${ context.get('myValue') }`);
    context.set('myValue', 5);
    
    console.log(`1: From doSomething context.get('myValue') = ${ context.get('myValue') }`);
    setTimeout(() => {
      context.set('myValue', 'Hello to Jason Isaacs');
    }, 1000);
    console.log(`2: From doSomething context.get('myValue') = ${ context.get('myValue') }`);
    setTimeout(() => {
      console.log(`3: From doSomething context.get('myValue') = ${ context.get('myValue') }`);    
    }, 1000);
  });
}

function doSomeOtherThing() {
  context.run(() => {
    console.log(`0: From doSomeOtherthing context.get('myValue') = ${ context.get('myValue') }`);
    context.set('myValue', 99);
    
    console.log(`1: From doSomeOtherthing context.get('myValue') = ${ context.get('myValue') }`);
    setTimeout(() => {
      context.set('myValue', 'Hello to Idris');
    }, 500);
    console.log(`2: From doSomeOtherthing context.get('myValue') = ${ context.get('myValue') }`);
    setTimeout(() => {
      console.log(`3: From doSomeOtherthing context.get('myValue') = ${ context.get('myValue') }`);    
    }, 500);
  });
}


setTimeout(doSomething, 0);
setTimeout(doSomeOtherThing, 0);
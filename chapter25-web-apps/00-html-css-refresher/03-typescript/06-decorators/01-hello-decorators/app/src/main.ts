/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
function simpleClassDecorator(constructor: Function) {
  console.log(`simpleClassDecorator activated!`);
}

@simpleClassDecorator
class MyClass {
}

/*
  if you run now, you'll see that the message is printed,
  before any instance of the class is created, and only once!
*/

function decoratorFactory(message: string) {
  return (constructor: Function) => {
    console.log(`decoratorFactory invoked with ${message}`);
  };
}

@decoratorFactory('Hello to Jason Isaacs!')
class MyOtherClass {
}

@decoratorFactory('Hello to Idris Elba!')
class MyYetAnotherClass {
}
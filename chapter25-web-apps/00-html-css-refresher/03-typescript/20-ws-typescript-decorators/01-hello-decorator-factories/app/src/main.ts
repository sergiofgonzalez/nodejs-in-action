function ClassDecoratorFactory(myAdditionalParam: string) {
  console.log(`Inside the decorator factory: ${ myAdditionalParam }`);
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (constructor: Function) {
    /* myAdditionalParam is available here! */
    console.log(`Inside the decorator: ${ myAdditionalParam }`);
  };
}

@ClassDecoratorFactory('myString')
class MyClass {}
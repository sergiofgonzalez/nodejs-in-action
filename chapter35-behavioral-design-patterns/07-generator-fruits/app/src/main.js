function* fruitGenerator() {
  yield 'peach';
  yield 'watermelon';
  return 'summer';
}

/* invoking a generator function does not execute the function */
const fruitGeneratorObj = fruitGenerator();

/* invoking `next()` acts on the iterator returned */
console.log(fruitGeneratorObj.next());
console.log(fruitGeneratorObj.next());
console.log(fruitGeneratorObj.next());

/* extra invocation after iterator in generator object is done */
console.log(fruitGeneratorObj.next());

/* The generator is also an iterable */
for (const fruit of fruitGenerator()) {
  console.log(fruit);
}

const fruits = [...fruitGenerator()];
console.log(fruits);

// eslint-disable-next-line no-unused-vars
const [fruitOne, ...other] = fruitGenerator();
console.log(fruitOne);

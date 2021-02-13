function* generator1() {
  yield 2;
  yield 3;
  yield 4;
}

function* generator2() {
  yield 1;
  yield* generator1();
  yield 5;
}

const gen = generator2();
for (const elem of gen) {
  console.log(elem);
}

/* another example, using an explicit iterable instead of a generator function */
function* generator() {
  yield* [1, 2, 3, 4, 5];
}

const nums = generator();
console.log(...nums);

'use strict';

const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah('
  },
  greetMe() { console.log('hello'); }
};

const dogName = adventurer?.name;

console.log(dogName);
const result = adventurer.greetUs?.();
console.log(result);
import { createProfiler } from './lib/create-profiler.js';

function greetMeNow(name1, name2, name3) {
  const friends = [name1, name2, name3].join(' and ');
  console.log(`Hello to ${ friends }!`);
}

function greetMeLater(name1, name2, name3) {
  setTimeout(() => greetMeNow(name1, name2, name3), 2500);
}


function getGreetingSync(name1, name2, name3) {
  const friends = [name1, name2, name3].join(' and ');
  return `Hello to ${ friends }`;
}

function getGreetingAsync(name1, name2, name3) {
  const p = new Promise(resolve => {
    process.nextTick(() => {
      const friends = [name1, name2, name3].join(' and ');
      resolve(`Hello to ${ friends }`);
    });
  });
  return p;
}


greetMeNow('John', 'Jane', 'Mary');

const profiledGreetMeNow = createProfiler(greetMeNow);
profiledGreetMeNow('John', 'Jane', 'Mary');


greetMeLater('John', 'Jane', 'Mary');

const profiledGreetMeLater = createProfiler(greetMeLater);
profiledGreetMeLater('John', 'Jane', 'Mary');

const profiledGreetingSync = createProfiler(getGreetingSync);
profiledGreetingSync('John', 'Jane', 'Mary');

const profiledGreetingAsync = createProfiler(getGreetingAsync);
profiledGreetingAsync('John', 'Jane', 'Mary');

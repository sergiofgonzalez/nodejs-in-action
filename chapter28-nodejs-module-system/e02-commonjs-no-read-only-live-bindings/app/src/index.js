const counterModule = require('./counter-substack');
let { counter, increment } = require('./counter');

/* using the substack module has unexpected results */
console.log(counterModule.counter);
counterModule();
console.log(counterModule.counter); // still 0?: no live binding, so requiring code is not aware
counterModule.counter++;
console.log(counterModule.counter); // now 1


/* using regular exports too */
console.log(counter);
increment();
console.log(counter); // still 0: no live binding, requiring code has a copy, and therefore is not aware of the change
counter++;
console.log(counter);
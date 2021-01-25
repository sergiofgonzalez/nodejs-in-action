/* eslint-disable no-unused-vars */
import pLimit from 'p-limit';

/* scenario 1: the classic factorial, now with promises */
async function factorial(n) {
  if (n == 1) {
    console.log(`base case reached`);
    return 1;
  }
  console.log(`intitiating recursive call: factorial(${ n - 1 }): activeCount: ${ limit.activeCount }, pendingCount: ${ limit.pendingCount }`);
  return n * await limit(() => factorial(n - 1));
}

const limit = pLimit(4);
// console.log(`factorial(5)=${ factorial(5) }`);

factorial(5)
  .then(result => console.log(`factorial(5)=${ result }`))
  .catch(console.error)
  .finally(() => console.log(`factorial: done!`));
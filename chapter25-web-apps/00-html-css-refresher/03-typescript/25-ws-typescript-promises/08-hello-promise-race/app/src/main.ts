/* scenario1: a fulfilled promise resolves quicker than the others */
const promise1 = new Promise((resolve) => setTimeout(() => resolve('promise1 resolves quickly'), 100));
const promise2 = new Promise((resolve) => setTimeout(() => resolve('promise2 resolves slowlier'), 1000));
const promise3 = new Promise((resolve, reject) => setTimeout(() => reject('promise3 rejects somewhat in the middle'), 500));

Promise.race([ promise1, promise2, promise3 ])
  .then((result) => console.log(`result (scenario1):`, result))
  .catch((reason) => console.error(`reason (scenario1):`, reason));

/* scenario2: a rejected promise is quicker than the others */
const promise4 = new Promise((resolve) => setTimeout(() => resolve('promise4 resolves quickly'), 500));
const promise5 = new Promise((resolve) => setTimeout(() => resolve('promise5 resolves slowlier'), 1000));
const promise6 = new Promise((resolve, reject) => setTimeout(() => reject('promise6 rejects quicker than the others'), 100));

Promise.race([ promise4, promise5, promise6 ])
  .then((result) => console.log(`result (scenario2):`, result))
  .catch((reason) => console.error(`reason (scenario2):`, reason));

/* scenario 1: at least one of the promises fulfill */
const promise1 = Promise.reject('promise1 rejects');
const promise2 = new Promise((resolve) => setTimeout(() => resolve('promise2 resolves quickly'), 100));
const promise3 = new Promise((resolve) => setTimeout(() => resolve('promise3 resolves slowlier'), 1000));

Promise.any([ promise1, promise2, promise3 ])
  .then((result) => console.log(`result (scenario1):`, result))
  .catch((reason) => console.error(`reason (scenario1):`, reason));

/* scenario 2: none of the promises fulfill */
const promise4 = new Promise((resolve, reject) => setTimeout(() => reject('promise4 rejects quickly'), 100));
const promise5 = new Promise((resolve, reject) => setTimeout(() => reject('promise5 rejects slowlier'), 1000));
const promise6 = Promise.reject('promise6 rejects inmediately');

Promise.any([ promise4, promise5, promise6 ])
.then((result) => console.log(`result (scenario2):`, result))
.catch((reason) => {
  console.error(`reason (scenario2):`, reason);
  console.error(`reason instanceof AggregateError`, reason instanceof AggregateError);
  console.error(`reason.message (scenario2):`, reason.message);
  console.error(`reason.errors (scenario2):`, reason.errors);
});


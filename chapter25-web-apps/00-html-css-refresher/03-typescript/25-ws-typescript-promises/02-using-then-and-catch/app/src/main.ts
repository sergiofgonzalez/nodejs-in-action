/* we first define the `getValue` function */

import { rejects } from 'assert';

type GetValueFn = (output: number) => number | void;

function getValue(val: number, cb: GetValueFn) {
  setTimeout(() => {
    const result = val + Math.floor(Math.random() * 100);
    console.log(`>> val was ${ val }, new output is ${ result }`);
    cb(result);
  }, 1000);
}


/* unitary test */
// getValue(5, (output: number) => {
//   console.log(`unitary test: output=${ output }`);
// });

/* chaining 2 invocations */
// console.log(`${ new Date().toISOString() }: start`);
// getValue(0, (output: number) => {
//   getValue(output, (output: number) => {
//     console.log(`chaining 2 calls: output=${ output }`);
//     console.log(`${ new Date().toISOString() }: finished!`);
//   });
// });
// console.log(`${ new Date().toISOString() }: end`);


/* chaining 10 invocations to illustrate the callback hell */
// console.log(`${ new Date().toISOString() }: start`);
// getValue(0, (output: number) => {
//   getValue(output, (output: number) => {
//     getValue(output, (output: number) => {
//       getValue(output, (output: number) => {
//         getValue(output, (output: number) => {
//           getValue(output, (output: number) => {
//             getValue(output, (output: number) => {
//               getValue(output, (output: number) => {
//                 getValue(output, (output: number) => {
//                   getValue(output, (output: number) => {
//                     console.log(`${ new Date().toISOString() }: Final result: ${ output }`);
//                   });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// });
// console.log(`${ new Date().toISOString() }: end`);


function getValuePromise(val: number): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      const result = val + Math.floor(Math.random() * 100);
      console.log(`val was ${ val }, new output is ${ result }`);
      resolve(result);
    }, 1000);
  });
}

/* unitary test */
// console.log(`${ new Date().toISOString() }: start`);
// getValuePromise(5)
//   .then((output) => { console.log(`${ new Date().toISOString() }: Final result: ${ output }`); });
//   console.log(`${ new Date().toISOString() }: end`);

/* secondary test without taking benefit of chainable .then(...) */
// getValuePromise(0)
//   .then((output) => getValuePromise(output)
//     .then((output) => getValuePromise(output)
//       .then((output) => console.log(`Final result: ${output}`))
//     ));

/* chaining 10 calls without callback hell! */
// console.log(`${ new Date().toISOString() }: start`);
// getValuePromise(0)
//   .then((output) => getValuePromise(output))
//   .then((output) => getValuePromise(output))
//   .then((output) => getValuePromise(output))
//   .then((output) => getValuePromise(output))
//   .then((output) => getValuePromise(output))
//   .then((output) => getValuePromise(output))
//   .then((output) => getValuePromise(output))
//   .then((output) => getValuePromise(output))
//   .then((output) => getValuePromise(output))
//   .then((output) => { console.log(`${ new Date().toISOString() }: Final result: ${ output }`); });
//   console.log(`${ new Date().toISOString() }: end`);


// function getValuePromiseThatMightFail(val: number): Promise<number> {
//   return new Promise<number>((resolve, reject) => {
//     setTimeout(() => {
//       const result = val + Math.floor(Math.random() * 100);
//       console.log(`val was ${ val }, new output is ${ result }`);
//       if (result % 10 == 0) {
//         reject('result can be divided by 10!');
//       }
//       resolve(result);
//     }, 1000);
//   });
// }

// console.log(`${ new Date().toISOString() }: start`);
// getValuePromiseThatMightFail(0)
//   .then((output) => getValuePromiseThatMightFail(output))
//   .then((output) => getValuePromiseThatMightFail(output))
//   .then((output) => getValuePromiseThatMightFail(output))
//   .then((output) => getValuePromiseThatMightFail(output))
//   .then((output) => getValuePromiseThatMightFail(output))
//   .then((output) => getValuePromiseThatMightFail(output))
//   .then((output) => getValuePromiseThatMightFail(output))
//   .then((output) => getValuePromiseThatMightFail(output))
//   .then((output) => getValuePromiseThatMightFail(output))
//   .then((output) => { console.log(`${ new Date().toISOString() }: Final result: ${ output }`); })
//   .catch((err) => console.error(`ERROR was found: ${ err }`));
// console.log(`${ new Date().toISOString() }: end`);

/* using finally to display the final result */
function getValuePromiseThatMightFail(val: number): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      const result = val + Math.floor(Math.random() * 100);
      console.log(`val was ${ val }, new output is ${ result }`);
      if (result % 10 == 0) {
        reject('result can be divided by 10!');
      }
      resolve(result);
    }, 1000);
  });
}

console.log(`${ new Date().toISOString() }: start`);
getValuePromiseThatMightFail(0)
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => { console.log(`${ new Date().toISOString() }: Final result: ${ output }`); })
  .catch((err) => console.error(`ERROR was found: ${ err }`))
  .finally(() => console.log(`process finished!`));
console.log(`${ new Date().toISOString() }: end`);
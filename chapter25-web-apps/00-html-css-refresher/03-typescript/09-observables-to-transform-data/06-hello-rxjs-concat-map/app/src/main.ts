import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { concatMap } from 'rxjs/operators';     // Comment for mergeMap
// import { mergeMap } from 'rxjs/operators';  // Uncomment for mergeMap

const emitOneTwoThree = of(1, 2, 3);

/* uncomment to see the elements consumed out of order
const delayedEmit = emitOneTwoThree.pipe(
  mergeMap((value: number) => {
    const delayMillis = 1_000 * (4 - value);
    console.log(
      `>> emitting >>
      ${new Date().toISOString()}
      value: ${ value }
      delay: ${ delayMillis }`
      );
      return of(value).pipe(delay(delayMillis));
  })
);
*/

/* comment to see the elements consumed out of order */
const delayedEmit = emitOneTwoThree.pipe(
  concatMap((value: number) => {
    const delayMillis = 1_000 * (4 - value);
    console.log(
      `>> emitting >>
      ${new Date().toISOString()}
      value: ${ value }
      delay: ${ delayMillis }`
      );
      return of(value).pipe(delay(delayMillis));
  })
);

delayedEmit.subscribe(value => {
  console.log(
    `<< receiving <<
    ${new Date().toISOString()}
    received value: ${ value }`
  );
});
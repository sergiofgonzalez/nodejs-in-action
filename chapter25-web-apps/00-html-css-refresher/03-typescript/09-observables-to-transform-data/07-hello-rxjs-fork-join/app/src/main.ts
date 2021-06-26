import { forkJoin, interval, Observable } from 'rxjs';
import { map, take, toArray } from 'rxjs/operators';

const onePerSecond = interval(1000);

const threeNumbers: Observable<number[]> = onePerSecond.pipe(
  take(3),
  map((value: number) => {
    console.log(`>> threeNumbers emitting @ ${new Date().toLocaleTimeString()}`);
    return value;
  }),
  toArray()
);

const twoStrings: Observable<string[]> = onePerSecond.pipe(
  take(2),
  map((value: number) => {
    console.log(`>> twoStrings emitting @ ${new Date().toLocaleTimeString()}`);
    return `value_${value}`;
  }),
  toArray()
);

/* using array indexing to access the values in the observer */
// forkJoin([
//   threeNumbers,
//   twoStrings
// ]).subscribe((values) => {
//   console.log(`<< returned @ ${new Date().toLocaleTimeString()}`);
//   console.log(`<< threeNumbers returned:`, values[0]);
//   console.log(`<< twoNumbers returned:`, values[1]);
// });

/* using array destructuring makes it more readable */
forkJoin([
  threeNumbers,
  twoStrings
]).subscribe(([threeNumberValues, twoStringsValues]) => {
  console.log(`<< returned @ ${new Date().toLocaleTimeString()}`);
  console.log(`<< threeNumbers returned:`, threeNumberValues);
  console.log(`<< twoNumbers returned:`, twoStringsValues);
});
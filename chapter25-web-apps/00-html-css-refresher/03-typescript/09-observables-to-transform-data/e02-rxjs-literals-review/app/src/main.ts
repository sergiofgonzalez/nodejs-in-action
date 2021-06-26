import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const oneThroughTen: Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

oneThroughTen.pipe(
  map((num) => num % 2 === 0? 'even' : 'odd')
).subscribe((str) => {
  console.log(`>> received(1):`, str);
});

/* using literals we can be super-restrictive */
const listener = (evenOrOddStr: 'even' | 'odd'): void => {
  console.log(`>> received(2):`, evenOrOddStr);
};

oneThroughTen.pipe(
  map((num) => num % 2 === 0? 'even' : 'odd')
).subscribe(listener);

/*
oneThroughTen.pipe(
  map((num) => num % 2 === 0? `${num} is even` : `${num} is odd`)
).subscribe(listener); // ERROR: not assignable
*/
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const oneThroughTen: Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

const tupleStream = oneThroughTen.pipe(
  map((value: number): [number, string] => {
    let result: [number, string];
    if (value % 2 == 0) {
      result = [value, 'even'];
    } else {
      result = [value, 'odd'];
    }
    return result;
  })
);

/* receiving a typed tuple */
tupleStream.subscribe((tuple: [number, string])  => {
  const [num, strEvenOrOdd] = tuple;
  console.log(`>> received(1): ${ num } is ${ strEvenOrOdd }`);
});

/* destructuring the tuple (explicit typing) */
tupleStream.subscribe(([num, strEvenOrOdd]: [number, string])  => {
  console.log(`>> received(2): ${ num } is ${ strEvenOrOdd }`);
});

/* destructuring the tuple (no explicit typing) */
tupleStream.subscribe(([num, strEvenOrOdd])  => {
  console.log(`>> received(3): ${ num } is ${ strEvenOrOdd }`);
});
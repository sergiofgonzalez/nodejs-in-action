import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


/* single operator */
const emitter: Observable<number> = of(1, 2, 3, 4);

const evenOddEmitter: Observable<string> = emitter.pipe(
  map((value: number) => {
    console.log(`in map(): value received:`, value);
    return value % 2 == 0 ? 'even' : 'odd';
  })
);

evenOddEmitter.subscribe((value) => {
  console.log(`value:`, value);
});

/* combining operators */
const stringMap = emitter.pipe(
  map((value) => value * 2),
  map((value) => `str_${value}`)
);

stringMap.subscribe((value) => {
  console.log(`stringMap emitted:`, value);
});

/* swallowing values */
const oddSwallowerMap = emitter.pipe(
  map((value) => {
    if (value % 2 == 0) {
      return value;
    }
  })
);

oddSwallowerMap.subscribe((value) => {
  console.log(`subscriber received:`, value);
});

/* Explicitly returning null for swallowed values */
const betterOddSwallowerMap: Observable<number | null> = emitter.pipe(
  map((value) => {
    if (value % 2 == 0) {
      return value;
    } else {
      return null;
    }
  })
);

betterOddSwallowerMap.subscribe((value: number | null) => {
  console.log(`better subscriber received:`, value);
});
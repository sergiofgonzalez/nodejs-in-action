import { Observable, of, from } from 'rxjs';

/* of() */
const emitter : Observable<number> = of(1, 2, 3, 4);

emitter.subscribe((value) => {
  console.log(`value: ${value}`);
});

/* from() */
const emitterArray: Observable<number> = from([1, 2, 3, 4]);
emitterArray.subscribe((value) => {
  console.log(`arr:`, value);
});

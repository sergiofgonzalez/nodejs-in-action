import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface IValue {
  value: number;
}

interface INestedObj {
  id?: IValue;
}

const objEmit: Observable<INestedObj> = of(
  { id: { value: 1} },
  {},
  { id: { value: 3} }
);

const returnIdValue = objEmit.pipe(
  map((value: INestedObj) => {
    return value.id!.value;
  }),
  catchError((error) => {
    console.log(`ERROR: stream caught:`, error.message);
    return throwError(() => new Error('Unexpected value in the stream!'));
  })
);

returnIdValue.subscribe({
  next: (value) => {
    console.log(`received:`, value);
    if (!value) {
      throw new Error(`Unexpected value received`);
    }
  },
  error: (err) => { console.error(`ERROR: listener caught:`, err.message); },
  complete: () => { console.log(`processing done!`); }
});

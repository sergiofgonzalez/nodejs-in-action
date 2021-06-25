import { Observable, of } from 'rxjs';
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
  catchError((error: unknown) => {
    console.log(`ERROR: stream caught:`, error);
    return of(null);
  })
);

returnIdValue.subscribe((value: number | null) => {
  console.log(`received:`, value);
}, (error: unknown) => {
  console.log(`error:`, error);
},
() => {
  console.log(`processing done!`);
});

import { interval, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

const sourceTimeObservableStream: Observable<number> = interval(1000);

const fiveNumbers = sourceTimeObservableStream.pipe(
  take(5),
  map((value: number) => {
    return `string_${value * 2}`;
  })
);

fiveNumbers.subscribe((value: string) => {
  console.log(new Date().toISOString(), value);
});
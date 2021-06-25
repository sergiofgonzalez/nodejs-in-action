# TypeScript: Chapter 09 &mdash; Using *Observables* to transform data
> TBD

## Contents
+ An introduction *Observables*
+ `pipe` and `map`
+ Combining operators
+ Time-based *Observables*
+ Handling errors
+ `mergeMap`, `concatMap` and `forkJoin`
+ *Observable* subject

## Intro

One of the most powerful and popular JavaScript libraries that specializes in event processing is the *Reactive Extensions for JavaScript* library, or simply [RxJS](https://github.com/reactivex/rxjs).

*RxJS* uses the *Gang of Four (GoF)* **Observable pattern** as the basis for registering interest in an event, as well as for doing something when the event is triggered.

Along with the *Observer* pattern, *RxJS* provides a set of utility functions to transform event data.

At the heart of the *RxJS* library is the concept of *Observables*, the source event streams. In practice, when you hear that someone says use *Observables*, they mean use *RxJS* library with its source streams and utility functions.

> The **Observer** pattern is a fundamental pattern in the asynchronous world of Node.js. It is the ideal solution for modeling the reactive pattern of Node.js and a perfect complement for callbacks.<br>The **Observer** pattern defines an object (called *subject*) that can notify a set of *observers* (or *listeners*) when a change in state occurs.

| NOTE: |
| :---- |
| The *Observer* pattern in the context of Node.js events, is discussed in detail in [Chapter 29 &mdash; Callbacks and Events in depth: The **Observer** pattern](../chapter29-callbacks-and-events/README.md#the-observer-pattern) section. You can refer to it for a reminder of the concepts backing the pattern. |

## Introduction to *Observables*

In this chapter, you will use the *RxJS* library implementation of the *Observer* pattern, which provides great support for TypeScript projects.

You have to start by installing the *RxJS* library using `npm install rxjs`. The library already includes the declaration files, so you don't need to install them separately.

You can see our first *observable* in action by executing the following piece of code:

```typescript
import { Observable, of } from 'rxjs';

const emitter : Observable<number> = of(1, 2, 3, 4);

emitter.subscribe((value) => {
  console.log(`value: ${value}`);
});
```

+ You start by importing the `Observable` class and the `of()` function.
+ Then, you define your `emitter` as an object of type `Observable<number>`. This will declare `emitter` as an *Observable* of type `number`.
+ Then, we initialize/instantiate the `emitter` as an *Observable* from the numbers 1 through 4 using `of(1, 2, 3, 4)`.
+ Finally, we create an *Observer* using `emitter.subscribe()` to which we pass a function that handles the event that was triggered from the *Observable*. The subscribe function takes a function as a parameter, and this function will be called once for each value that is emitted by the *Observable*.

> The objects of type `Observable<T>` expose the `subscribe()` function in order to register *Observers*.<br>Only when calling the `subscribe()` function, the *Observable* will start emitting values.<br>The values produced by the *Observable* are known as the *Observable stream*.


The `of()` function has a partner function named `from` which uses an array as input instead of a variable number of arguments:

```typescript
import { Observable, from } from 'rxjs';

const emitter : Observable<number> = from([1, 2, 3, 4]);

emitter.subscribe((value) => {
  console.log(`value: ${value}`);
});
```

The only difference is that the *Observable stream* is created here from the `[1, 2, 3, 4]` array.

| EXAMPLE: |
| :------- |
| See [01: Hello, *RxJS*!](01-hello-rxjs) for a runnable example. |

### `pipe()` and `map()`

The *RxJS* library provides a `pipe()` function to all `Observable<T>` objects.

This function takes a variable number of functions and will execute these functions on each value that is emitted by the *Observable*.

> The functions provided to the `pipe()` functions are called **Observable Operators** and take an `Observable<T>` as input and return an `Observable<S>`. That is, the `pipe()` function emits an **Observable stream**.


Consider the following example code:

```typescript
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


const emitter = of(1, 2, 3, 4);

const evenOddEmitter = emitter.pipe(
  map((value: number) => {
    console.log(`in map(): value received:`, value);
    return value % 2 == 0 ? 'even' : 'odd';
  })
);

evenOddEmitter.subscribe((value) => {
  console.log(`value:`, value);
});
```

You start by creating an *Observable* that will emit the values 1 through 4. Then, you use `pipe()` to create another *Observable* that takes a function that maps the value emitted by the first observable into the union type `'even' | 'odd'` by using the modulus function.

Finally, you create an observer by invoking `subscribe()` in the *Observable* returned by the `pipe()` function.

Note that the TypeScript compiler does not require explicitly setting the type of the *Observables*. However, sometimes it is good to add them to help the reader understand what are the types involved:

```typescript
const emitter: Observable<number> = of(1, 2, 3, 4);

const evenOddEmitter: Observable<string> = emitter.pipe(
  map((value: number) => {
    console.log(`in map(): value received:`, value);
    return value % 2 == 0 ? 'even' : 'odd';
  })
);
```

As discussed, above, the `pipe()` function accepts a variable number of functions, which we can use to *combine operators* in a *chain*:

```typescript
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


const emitter = of(1, 2, 3, 4);
const stringMap = emitter.pipe(
  map((value) => value * 2),
  map((value) => `str_${value}`)
);

stringMap.subscribe((value) => {
  console.log(`stringMap emitted:`, value);
});
```

### Avoid swallowing values

When writing functions that are used by the *RxJS* operator functions, we need to be careful that we do not swallow values unexpectedly, as the *observers* will not receive the expected data.

Consider the following example, in which the `map()` function is not returning a value when the value emitted is odd:

```typescript
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


const emitter = of(1, 2, 3, 4);

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
```

The observer (subscriber) will be called for each value emitted, that is 4 times for values 1 through 4, but the value received for the odd values will be `undefined`:

```
subscriber received: undefined
subscriber received: 2
subscriber received: undefined
subscriber received: 4
```

If you really intend to really swallow a certain set of values, it is considered a good practice to explicitly return `null` instead:

```typescript
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
```

Note that if you would have typed the `subscriber()` parameters, the compiler (and the IDE) would have helped you identify the problem:

```typescript
/* ERROR: number | undefined is not assignable to `number` */
oddSwallowerMap.subscribe((value: number) => {
  console.log(`subscriber received:`, value);
});
```

| EXAMPLE: |
| :------- |
| See [02: Hello, *RxJS* `pipe()` and `map()`!](02-hello-rxjs-pipe-map) for a runnable example. |


### Time-based Observables

*RxJS Observables* work well with asynchronous events too. In fact, the ability to handle async events with *Observables* is the cornerstone of many techniques used both in the frontend and backend side when interacting with external resources.

Consider the following example, that uses the `interval()` function that generates an event with a given frequency.

```typescript
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
```


The `interval(1000)` function will emit an ever-increasing integer value, starting at 0, every `1000` milliseconds. That will represent our time-based event stream.

Then, we create an *Observable* by piping our source interval *Observable* into two functions.

The first function, `take(5)` specifies the number of *Observable* values to take.

The second function will map each of these values into a string.

Once we have received all five values, the *Observable stream* will stop.

Finally, we're creating an *observer* object by subscribing to this event stream.

| EXAMPLE: |
| :------- |
| See [03: Hello, async events!](03-hello-rxjs-async-events) for a runnable example. |

## Observable errors

Consider the following piece of code:

```typescript
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
  })
);

returnIdValue.subscribe((value) => {
  console.log(`received:`, value);
});
```

At this point, it should be clear that we create an *Observable stream* that will emit three `INestedObj` instances, the second of those not having an `id`.

Then, we pipe those objects into another *Observable* that extracts the `id.value` from the object received and returns it. Note that this function assumes that the `value.id` will always be there, despite we know that might not be the case:

Finall, we create an *observer* that consumes the result of the pipe stream.

If we execute the program we will get:

```
received: 1
TypeError: Cannot read property 'value' of undefined
```

It's clear that this example was fabricated, but this can happen for instance when emitting events for each of the JSON objects we're reading from a file.

This can be fixed applying the following error handling techniques:

```typescript
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
    console.log(`ERROR: stream caught:`, error.?message);
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
```

In the example above, we have used `catchError()` operator to catch any errors that might occur within the *Observable stream* itself. In your case, you are providing some info in the console and returning an event of `null`.

Then, we have also implemented an error handler for the `subscribe()` function itself. Note that in this case, the error handler is not necessary, as the error is produced in the stream itself.

Note also that the stream stops producing new events after the error, so that the object `{ id: { value: 3} }` is never produced.

```
received: 1
ERROR: stream caught: Cannot read property 'value' of undefined
received: null
processing done!
```

| EXAMPLE: |
| :------- |
| See [04: Handling errors in *Observables*](04-hello-rxjs-observable-errors) for a runnable example. |

## Observables returning Observables

Consider this real world scenario in which we have an API that returns a list of product IDs that are available in the warehouse. If we want to show this information to the end-user, we will need to call another API that retrieves the product details for each of the IDs we have received.

In summary, we're creating a new *Observable stream* for each of the *Observable values* that we get from the product IDs stream.

This is possible using the following approach:

```typescript
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface IProductId {
  id: number;
}

interface IProductDetails {
  name: string;
  description: string;
}


const productList: Observable<IProductId> = from([{ id: 1 }, { id: 2}, { id: 3 }]);

function getProductDetails(id: number): Observable<IProductDetails> {
  return of({ name: `Product_${id}`, description: `Description for Product_${id}`});
}

productList.pipe(
  map((value: IProductId) => getProductDetails(value.id)),
).subscribe((value: Observable<IProductDetails>) => {
  value.subscribe((value: IProductDetails) => {
    console.log(`----------------`);
    console.log(`Product name:`, value.name);
    console.log(`Product desc:`, value.description);
    console.log(`----------------`);
  });
});
```

You start with an *Observable* named `productList` taht is returning values of type `IProductId`.

Then we have a function `getProductDetails()` athat accept ids and return not an `IProductDetails`, but rather an *Observable* of `IProductDetails`. That will let us establish the necessary chaining between the two *Observable streams*.

That is done with `pipe()` which is configured to map `IProductId`s into `Observable<IProductDetails>` so that multiple observers can get notified when the information is available.

Remember that the idea to use *Observables* is to decouple the component that is sourcing the events from the components that are consuming or acting upon those events.

By wrapping our results in `Observable<T>` we're ensuring that those can be consumed in a more flexible manner than if they were directly returned.

Finally, we consume the *Observable stream* using `subscribe()`. As in this case `value` is an `Observable<IProductDetails>`, we need to again call subscribe to get to the `IProductDetails` object itself.

| EXAMPLE: |
| :------- |
| See [05: Observables returning Observables](05-rxjs-observables-returning-observables) for a runnable example. |

### `mergeMap()`

The `mergeMap()` operator is used to return a single value from an *Observable stream*. In the example above it can be used to simplify the implementation so that we don't need to do a second subscribe operation:

```typescript
productList.pipe(
  mergeMap((value: IProductId): Observable<IProductDetails> => getProductDetails(value.id)),
).subscribe((value: IProductDetails) => {
  console.log(`--mergemap---------------`);
  console.log(`Product name:`, value.name);
  console.log(`Product desc:`, value.description);
  console.log(`-------------------------`);
});
```

That is, `mergeMap()` is used to *flatten* an inner *Observable*.

| EXAMPLE: |
| :------- |
| See [05: Observables returning Observables](05-rxjs-observables-returning-observables) for a runnable example. |

### `concatMap`

When an *Observable* emits values, the values emitted may arrive at a subscriber out of the intended order.

Consider the following code in which we intended to emit the values 1 through 3, but forcefully introduced a delay so that the numbers will get at the subscriber out of order:

```typescript
import { of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

const emitOneTwoThree = of(1, 2, 3);

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

delayedEmit.subscribe(value => {
  console.log(
    `<< receiving <<
    ${new Date().toISOString()}
    received value: ${ value }`
  );
});
```

```
>> emitting >>
      2021-06-25T16:42:25.372Z
      value: 1
      delay: 3000
>> emitting >>
      2021-06-25T16:42:25.376Z
      value: 2
      delay: 2000
>> emitting >>
      2021-06-25T16:42:25.376Z
      value: 3
      delay: 1000
<< receiving <<
    2021-06-25T16:42:26.379Z
    received value: 3
<< receiving <<
    2021-06-25T16:42:27.377Z
    received value: 2
<< receiving <<
    2021-06-25T16:42:28.377Z
    received value: 1
```

As you can see, we have introduced a delay, so that the original *Observable stream* is effectively emitted as 1, 2, 3, but we're *piping* a delay, so that we delay the value a different number of seconds so that the subscriber receives 3, 2, 1.

If it's important to process the emitted values in order, the `concatMap()` operator can be used instead of `mergeMap()`. This function will only subscribe to the next Observable when the previous one has been consumed.

That is, if we change our code to:
```typescript
const delayedEmit = emitOneTwoThree.pipe(
  concatMap((value: number) => {
    const delayMillis = 1_000 * (4 - value) + 5_000;
    console.log(
      `>> emitting >>
      ${new Date().toISOString()}
      value: ${ value }
      delay: ${ delayMillis }`
      );
      return of(value).pipe(delay(delayMillis));
  })
);
```

Then, the elements will be consumed in order, because `2` will be emitted only after `1` has been emitted, and `3` will be emitted only after `2`.

That is, the execution output is as follows:

```
>> emitting >>
      2021-06-25T16:58:58.384Z
      value: 1
      delay: 3000
<< receiving <<
    2021-06-25T16:59:01.391Z
    received value: 1
>> emitting >>
      2021-06-25T16:59:01.391Z
      value: 2
      delay: 2000
<< receiving <<
    2021-06-25T16:59:03.394Z
    received value: 2
>> emitting >>
      2021-06-25T16:59:03.394Z
      value: 3
      delay: 1000
<< receiving <<
    2021-06-25T16:59:04.396Z
    received value: 3
```


### `forkJoin`

## Observable subject

## You know you've mastered this chapter when...

## Exercises, code examples, and mini-projects

### [01: Hello, *RxJS*!](01-hello-rxjs)
Introducing *RxJS* library for *Observables*.

### [02: Hello, *RxJS* `pipe()` and `map()`!](02-hello-rxjs-pipe-map)
Introducing *RxJS* functions `pipe()` and `map()`.

### [03: Hello, async events!](03-hello-rxjs-async-events)
Introducing *RxJS Observables* working with async, time-based events.

### [04: Handling errors in *Observables*](04-hello-rxjs-observable-errors)
Illustrates how to handle errors in *Observables*.

### [05: Observables returning Observables](05-rxjs-observables-returning-observables)
Illustrates a situation in which Observables return Observables and `mergeMap()` operator.

#### ToDo

- [ ] Create an observable that emits the values 1 through 10 and use `pipe()` and `map()` to arrange that the observers get a tuple `[num, str]` where str indicates if the number is even or odd.

- [ ] Review union types when emitting literals such as `even` and `odd`.

- [ ] Observables with separate callback arguments are now deprecated. Change the `catchError` example so that it no longer features the deprecation warning.
Instead of passing separate callback arguments, use an observer argument. Signatures taking separate callback arguments will be removed in v8. Details: https://rxjs.dev/deprecations/subscribe-arguments */

- [ ] Using Observables make the consumption of data more flexible. Illustrate with an example what we're seeing in the example 5 (which does not seem so clear).

- [ ] Review syntax for type annotations with lambdas as in `(value: IProductId): Observable<IProductDescription> => getProductDetails(value.id)`
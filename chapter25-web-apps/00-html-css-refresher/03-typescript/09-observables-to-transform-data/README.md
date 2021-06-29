# TypeScript: Chapter 09 &mdash; Using *Observables* to transform data
> Practising the *Observable* pattern using *RxJS* library

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

| NOTE: |
| :---- |
| There is a deprecation warning in [04: Handling errors in *Observables*](04-hello-rxjs-observable-errors) that is fixed in [e03: Using *Observables* to transform data &mdash; Error Management in Observables](e03-rxjs-error-management). |

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
| EXAMPLE: |
| :------- |
| See ### [06: The `concatMap()` operator](06-hello-rxjs-concat-map) for a runnable example. |

### `forkJoin()`

The `forkJoin()` function can be used when we have a number of *Observable streams* that need to all complete before we do something.

This is common in frontend, when dealing with REST requests at the start of a page load, where the page may need to load data from a number of different REST APIs before being able to display the page.

Consider the following example that features two async *Observable streams* that generate values at different times and a `forkJoin()` function that synchronizes them:

```typescript
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

forkJoin([
  threeNumbers,
  twoStrings
]).subscribe((values) => {
  console.log(`<< returned @ ${new Date().toLocaleTimeString()}`);
  console.log(`<< threeNumbers returned:`, values[0]);
  console.log(`<< twoNumbers returned:`, values[1]);
});
```

You start by using `interval()` to configure a time-based stream that triggers a number with the specified frequency (i.e. 1 second).

You create them your first *Observable stream* by piping this stream, taking the first three values, mapping it to show some info in the console and then calling `toArray()` which combines all the emitted values into an array. Note that this means that the value will only be emitted when all the intermediate values have been emitted.

Similarly, you create another *Observable stream* with the same shape, but this one taking only two values, and returning an array of strings.

While `threeNumbers` will take three seconds to emit the array `[0, 1, 2]`, `twoNumbers` will emit `['value_0', 'value_1']` in two seconds.

Thus, in order to *synchronize* them, we use a `forkJoin()` which returns an *Observable* that we can subscribe to when both the streams that we pass as parameters have emitted their values.

As a result we will obtain:
```
>> threeNumbers emitting @ 9:27:50 AM
>> twoStrings emitting @ 9:27:50 AM
>> threeNumbers emitting @ 9:27:51 AM
>> twoStrings emitting @ 9:27:51 AM
>> threeNumbers emitting @ 9:27:52 AM
<< returned @ 9:27:52 AM
<< threeNumbers returned: [ 0, 1, 2 ]
<< twoNumbers returned: [ 'value_0', 'value_1' ]
```

Note that we have used array indexing to access the values emitted by the `forkJoin()`. Alternatively, we could have also used array destructuring to make it more readable:

```typescript
forkJoin([
  threeNumbers,
  twoStrings
]).subscribe(([threeNumberValues, twoStringsValues]) => {
  console.log(`<< returned @ ${new Date().toLocaleTimeString()}`);
  console.log(`<< threeNumbers returned:`, threeNumberValues);
  console.log(`<< twoNumbers returned:`, twoStringsValues);
});
```

| EXAMPLE: |
| :------- |
| See [07: `forkJoin()`](07-hello-rxjs-fork-join) for a runnable example. |

## Observable subject

In all the examples so far, we have worked with *Observables* that emit values, and we have configured *observers* that subscribe to those *Observable streams*.

The *Observables* are responsible for emitting values, and the subscribers react to the values being emitted. When an *Observable stream* is complete, the subscriber complete their processing and their execution stops.

Now consider a situation in which we would like the subscribers to wait around instead of completing. This is a common situation in an *event bus*, where multiple subscribers will register their interest in a particular topic, and will react to it when that event is raised on the *event bus*.

*RxJS* provides the `Subject` class for this particular purpose.
> A `Subject` maintains a list of listeners that have registered their interest. A `Subject` is also an *Observable stream*, and therefore listeners can subscribe to the stream using `subscribe()`.<br>The `Subject` has the ability to multicast, that is, it allows multiple subscribers to the same stream to receive the notification when an event happens.

Consider the following simple implementation of an *event bus*:

```typescript
// lib/event-bus.ts
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

enum EventKeys {
  ALL = 'all-events',
  SINGLE = 'single-event'
}

export interface IBroadcastEvent {
  key: EventKeys;
  data: string;
}

export class BroadcastService {
  private _eventBus = new Subject<IBroadcastEvent>();

  on(key: EventKeys): Observable<string> {
    return this._eventBus.asObservable().pipe(
      filter(
        event => event.key === key || event.key === EventKeys.ALL
      ),
      map(event => event.data)
    );
  }

  broadcast(key: EventKeys, data: string): void {
    this._eventBus.next({ key, data });
  }
}
```

You start by defining an enum `EventKeys` which defines two values to identify whether the subscriber is interested in receiving a notification for all the events sent to the *event bus*, or only a particular one.

Then, you define an interface `IBroadcastEvent` which defines the *shape* of an event of the *event bus*.

Then you define the class `BroadcastService` which is the implementation of the *event bus*. The class includes the definition of a private instance property `_eventBus` of type `Subject<IBroadcastEvent>`.

Then you declare two methods `on(key: EventKeys)` and `broadcast(key: EventKeys, data: string)`.

The first method `on()` will be used by subscribers that want to register a listener for a particular event. In the implementation of the function, we use `asObservable()` to create a new *Observable stream* using the *Subject* as the source. We then use the `filter()` operator to check if the incoming argument named `key` matches the key of the event being raised, or if it matches `EventKeys.ALL`. If that is the case, we re-emit the event, otherwise, we swallow it as the observer won't be interested in it.

In summary, the `on()` function will notify all registered *Observers* of events that either match the key `EventKeys.ALL` or the specific *Observers* that are listening to that particular event that has been emitted. Note that the events are emitted by calling `next()` on the *Subject*.

The function `broadcast()` is used to send an event to the *event bus* &mdash; it will be used to broadcast an event to any registered listeners.

Now, let's consider the implementation of listener on this *event bus*:

```typescript
// lib/listener.ts
import { Subscription } from 'rxjs';
import { BroadcastService, EventKeys } from './event-bus';
import * as _ from 'underscore';

export class Listener {
  private eventSubscription: Subscription;

  constructor(
    broadcastService: BroadcastService,
    eventKey: EventKeys,
    private listenerName: string
  ) {
    _.bindAll(this, 'reactToEvent');
    this.eventSubscription = broadcastService.on(eventKey).subscribe(this.reactToEvent);
  }

  private reactToEvent(event: string) {
    console.log(`Listener [${ this.listenerName }] received event: ${ event }`);
  }

  public unregister(): void {
    this.eventSubscription.unsubscribe();
  }
}
```

The `Listener` class has a single private property `eventSubscription` of type `Subscription`

In the constructor we received a reference to the *event bus*, the `eventKey` that will identify if the listener is interested in all the event or in specific ones, and the `listenerName` which will be used to identify the listener in the logs.

The implementation of the constructor starts with a call to `_.bindAll(this, 'reactToEvent')`. This is necessary to ensure that the calls to `reactToEvent()` have the appropriate `this` bound to them, and `bindAll()` is very handy in these situations in which you want to specify the function *statically* but you want to mutate it to receive the appropriate `this`.

Right after that, the `eventSubscription` property is set to the *Observable* returned by the `on()` function for the specific `eventKey`, and configures `reactToEvent()` as the listener using `subscription()`.

Finally, we also define an `unregister()` function so that we can unsubscribe this listener.


Now, we can build our main program that illustrates how to use with this *event bus*:

```typescript
import { BroadcastService, EventKeys } from './lib/event-bus';
import { Listener } from './lib/listener';

const broadcastService = new BroadcastService();

const listenerOne = new Listener(
  broadcastService,
  EventKeys.ALL,
  'first'
);

const listenerTwo = new Listener(
  broadcastService,
  EventKeys.SINGLE,
  'second'
);

broadcastService.broadcast(EventKeys.ALL, 'ALL event broadcast');
broadcastService.broadcast(EventKeys.SINGLE, 'SINGLE event broadcast');

listenerOne.unregister();
broadcastService.broadcast(EventKeys.ALL, 'ALL event broadcast #2');

listenerTwo.unregister();
broadcastService.broadcast(EventKeys.ALL, 'ALL event broadcast #3');
```

You start by instantiating the *event bus* by creating a new instance of the `BroadcastService`.

Then you create two listeners `'first'` and `'second'`; the former one interested in all the events, and the latter in the single ones. Right after that you can start triggering events and seeing how the listeners react to those.

Also you can see how you can unregister the listeners when they are no longer interested in receiving further events.

In particular, when executing the program you will get:

```
Listener [first] received event: ALL event broadcast
Listener [second] received event: ALL event broadcast
Listener [second] received event: SINGLE event broadcast
Listener [second] received event: ALL event broadcast #2
```

| EXAMPLE: |
| :------- |
| See [08: A minimal implementation of an event bus](08-rxjs-event-bus) for a runnable example. |

## You know you've mastered this chapter when...

+ You are comfortable reading the examples using *RxJS*.

+ You understand the concepts of *Observables* and *Observers (listeners)*.

+ You're comfortable using `pipe()` and `map()` when working with streams of *Observables*.


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

### [06: The `concatMap()` operator](06-hello-rxjs-concat-map)
Illustrates the `concatMap()` operator.

### [07: `forkJoin()`](07-hello-rxjs-fork-join)
Illustrates the `jorkJoin()` function, which lets you *combine* several *Observable streams* and will wait for them to complete before executing the `subscribe()` callback.

### [08: A minimal implementation of an event bus](08-rxjs-event-bus)
Illustrates how to use the `Subject` of *RxJS* to build a minimal *event bus*.

### [e01: Using *Observables* to transform data &mdash; Using `map()` to return tuples](e01-rxjs-map-to-tuples)
Illustrates how to use the `map()` operator to return tuples by implementing the following exercise:

Create an *Observable* that emits the values 1 through 10 and use `pipe()` and `map()` so that the *observers* get a tuple `[num, str]` where str indicates if the `num` is even or odd.

### [e02: Review of *literals*]()
Reviewing *literals* in the context of an *RxJS* example.

Create an *Observable* that returns an stream of numbers one through 10, which pipes the number into the strings `'even'` or `'odd'`. Verify that the TypeScript system assumes the *Observable* to be of type `'even' | 'odd'` rather than `string`.

### [e03: Using *Observables* to transform data &mdash; Error Management in Observables](e03-rxjs-error-management)
Removing the deprecation from [04: Handling errors in *Observables*](../04-hello-rxjs-observable-errors)

In [04: Handling errors in *Observables*](../04-hello-rxjs-observable-errors) there is a deprecation error found in the way in which `subscribe()` is written. Fix it and update the code so that it works in the same way but using the new approach.

### [e04: Using *Observables* to transform data &mdash; *Observables* from *Observables*: a rewrite](e04-rxjs-observables-from-observables-rewrite)
Rewriting an example similar to [05: Observables returning Observables](05-rxjs-observables-returning-observables) to try and *grok* the concept.

In the example, we implement in three different ways a process that simulates the retrieval of the details of a list of elements, as in:
+ you query the database and obtain a list of corresponding product Ids
+ you then use each of the product Ids to fetch each of the product details

### [e05: Using *Observables* to transform data &mdash; Hello, `_.bindAll()`](e05-hello-underscore-bindall)
Grokking the need for `_.bindAll()` when binding listeners in *RxJS*.

Examples and some written docs inspired from the article [Understanding `bind` and `bindAll` in Backbone.js (https://www.bigbinary.com/blog/understanding-bind-and-bindall-in-backbone) but exercised in the context of Node.js instead of the browser.


### [e06: Using *Observables* to transform data &mdash; Enhancing the *RxJS* event bus](e06-rxjs-event-bus)
Enhancing the example [08: A minimal implementation of an event bus](08-rxjs-event-bus)

An exercise in which we enhance the *RxJS event bus* from the concepts section with the following capabilities:
+ allow custom listener functions
+ allowing custom events

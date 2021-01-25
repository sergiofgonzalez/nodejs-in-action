# Part 4: Node.js avanced patterns and techniques
## Chapter 33 &mdash; Creational design patterns
### 02 &mdash; *Factory* pattern: Simple code profiler
> Illustrates how to define a *factory* and its advantages by building a simple code profiler that gets automatically deactivated when `NODE_ENV=production`

#### Usage notes
The example defines a `Profiler` class that can be accessed only through the *factory* function `createProfiler(...)`. The profiler keeps track of the time executed between a `start()` and `end()`, but only when `NODE_ENV` is not set to production.

Therefore, to see the example in action you can do:

```bash
# show the profiling info
$ npm start 270
Timer 'getAllFactors(270)' took 20935 nanos
Factors of 270 are:  [ 2, 3, 3, 3, 5 ]
```

To see how the *profiler* gets automatically deactivated when running in production, you can do:

```bash
# show the profiling info
$ NODE_ENV=production npm start 270
Factors of 270 are:  [ 2, 3, 3, 3, 5 ]
```
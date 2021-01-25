# 06-ecmascript-promise-parallel
> ES6 promises in parallel flows

## Description
Illustrates how to implement parallel flows using *Promises*. In the application, we define a function `fetch` that simulates accessing an external resource (database, HTTP server, ...) in an async fashion.

Then, it explores how different scenarios can be implemented. It is recommended to uncomment a particular scenario (commenting all other scenarios), then build and run the application and check the results on the console.

Scenarios:
+ Scenario 1 &mdash; getting results separately (verify Promise approach)
+ Scenario 2 &mdash; shooting requests in parallel and getting the results
+ Scenario 3 &mdash; same as Scenario 2 but using destructuring when getting the results
+ Scenario 4 &mdash; using `Promise.race` which resolves the Promise with the first one that is fulfilled or rejected
+ Scenario 5 &mdash; how to implement Promises with timeout using `Promise.race`.
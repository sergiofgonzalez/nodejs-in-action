# e03 &mdash; Proxyquire
> practicing proxyquire with the official examples

## Description
Additional examples taken from `proxyquire` official documentation.

In the first example `file-all-caps-test.js` it is demonstrated how you can test a module and replace dependencies in the module under test (`file-all-caps`) with stubs that have different behavior from the original one.

In the second example `get-test.js` it is demonstrated how you can test a module that relies on a 3rd party module, but stubbing the 3rd party module itself, even when it is not available in `node_modules`.
Additionally, in this second test `sinon` is used to test that the callback is effectively called, and also it is illustrated how to mock `process.nextTick` with Sinon's fake timers.

The signature for the function is as follows:
```javascript
proxyquire({string} request, {Object} stubs)
```

where:
+ `request` &mdash; path to the module to be tested
+ `stubs` &mdash; key/value pairs of the form `{ modulePath1: stub1, modulePath2: stub2...}`. Note that:
  + modulePaths are relative to the tested modules, not to the tested file itself. That is, the `modulePath` should be written exacted as found in the module under test.


Proxyquire exposes some additional functionality that might come in handy in certain use cases:
+ Preventing call thru to the original dependency &mdash; use `noCallThru` to enable it (see https://github.com/thlorenz/proxyquire#preventing-call-thru-to-original-dependency).
+ Simulate the absence of a module &mdash; you can use `proxyquire` to pretend whether a module would not be there (in case your code behaves differently). See https://github.com/thlorenz/proxyquire#using-proxyquire-to-simulate-the-absence-of-modules.
+ Disable module caching &mdash; use `noPreserveCache` to force that the module gets loaded fresh every time.

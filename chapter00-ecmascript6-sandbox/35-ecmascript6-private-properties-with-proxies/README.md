# 35-ecmascript6-private-properties-with-proxies
> concealing access to prefixed properties with proxies and traps

## Description
Illustrates how to conceal access to certain properties in a JavaScript object using ES6 proxies and traps.

In the example, a function `wrapObject` accepting an object and an optional prefix for private libraries is defined. Calling that function returns a proxy for the given object in which the properties that start with that prefix are protected against reads and writes.


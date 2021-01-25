# e15-hello-promisify
> introducing `util.promisify` to convert regular callbacks into promises

## Description
`util.promisify` lets you convert a normalized callback function following the style:
```javascript
(err, data) => { /* ... */ }
```
into a promise that can be then used with *async/await* to also avoid promise chains.

In the example, we define a `wait` function that follows the normalized callback protocol and illustrate how to call it using callbacks, promises and using *async/await*.
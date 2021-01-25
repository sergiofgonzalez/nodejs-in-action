# 31-ecmascript6-async-await-flows
> handling parallel and race flows with async-await

## Description
Illustrate how easy it is to handle parallel flows using async-await, and how to resolve an async function with the fastest resolved promise using `await`.

### Parallel flows

```javascript
async function parallel() {
  const [r1, r2, r3] = await Promise.all([p1, p2, p3]); // execution suspended until all resolved
}
```

### Resolving with the fastest one
```javascript
async function parallel() {
  const [r1, r2, r3] = await Promise.race([p1, p2, p3]); // execution suspended until first one is resolved
}
```
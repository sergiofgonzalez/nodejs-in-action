# 30-ecmascript6-hello-async-await
> basics of using async/await

## Description
*Async* functions let us take promise-based implementation and take advantage of the synchronous-looking generator style &mdash; at the end, you don't have to change your implementation as long as the code you're using returns a promise that can be awaited.

Note that `await` can only be used inside *async* functions marked with the `async` keyword. *Async* functions work like generators: they suspend the execution in the local context untile a promise settles.
If the awaited expression isn't originally a promise, it will get casted into a promise.

```javascript
async function changePage() {
  try {
    const model = await fetch("/some/url");
    const html = await renderView(model);
    await setPage(html);
    console.log(`Successfully changed page!`);
  } catch (e) {
    console.log(`An error occurred while changing the page`);
  }
}
```

An *async* function returns a Promise as well. In the case of uncaught exceptions, the returned promise settles in rejection. Otherwise, the promise gets resolved to the returned value of the async function if any.

### Errors in async-await
Errors are swallowed silently within an async function just like inside normal Promises. Uncaught exceptions raised in the body of an *async* function or during suspended execution while evaluating an `await` expression will reject the promise returned by the async function.

Thus, in order to perform error handling you should either:
+ add try/catch blocks around await expressions
+ treat the async function as the promise it will be wrapped on, and use `.catch`.
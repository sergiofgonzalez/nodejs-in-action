# 14-closure
> using closures to bind values to functions when they are called

## Description
Very simple example in which a closure is defined to bind a particular parameter value to a function.

The first thing the app does is define an async function programmed to be executed as soon as possible:
```javascript
function asyncFunction(callback) {
  setTimeout(callback, 0);
}
```

The async function accepts a callback (that is, a function) as a parameter.

Then we give a local variable a value, and instead of just calling the async function as we did in the previous example, we create a closure for the function call:
```javascript
let color = `blue`;
(color => {
  asyncFunction(() => console.log(`color=${color}`));
})(color);
```

What we do in that piece of code is define a function that accepts a single parameter `color` and invokes `asyncFunction` passing it a function that accepts no arguments and simply calls `console.log` on the parameter passed. The we immediately call the function.
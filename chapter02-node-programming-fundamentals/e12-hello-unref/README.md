# e12-hello-unref
> introducing `unref`

## Description
The `unref` method, called on the return value of `setInterval` or `setTimeout`, tells Node.js that it can finish the program even when `clearTimeout` has not been called for that timer.

In the example, we create a timer that executes every second and that monitors the memory usage, and call `unref` on it to let Node exit when the program is finished.



# Part 4: Node.js avanced patterns and techniques
## Chapter 34 &mdash; Structural design patterns
### Exercise 2: Timestamped logs
Create a *proxy* for the ``console` object that enhances every logging function (`log()`, `error()`, `debug()` and `info()`) by prepending the current timestamp to the message you want to print in logs (e.g. console.log(`hello`) shoud print '2021-01-30T10:45:46.723Z hello') in the console.

#### Notes
The `console` object is *monkey-patched*, and as a result, once *proxied* all the invocations of the original method will also be timestamped.

In this case, it feels like a good option, especially if you want to standardize the way in which messages are being printed in an application. By simply creating this proxy, all the invocations of the `console` methods that are proxied will include the timestamp.
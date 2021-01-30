# Part 4: Node.js avanced patterns and techniques
## Chapter 34 &mdash; Structural design patterns
### Exercise 3: Colored console output
Write a *decorator* for the `console` object that adds the methods: `red(message)`, `yellow(message)`, `green(message)`. These methods should behave like `console.log(message)` except that they will print the message in red, yellow and green respectively. For simplicity, use the [ansi-styles](https://www.npmjs.com/package/ansi-styles) package.

#### Notes
Again, the *monkey-patching* technique is used for the *decorator* as it seemed appropriate in this case, so that subsequent calls to `console` after decorating it would already have the functions available for their use.
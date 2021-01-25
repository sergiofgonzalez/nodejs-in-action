# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### 09 &mdash; export default functionality
> encouraging the *single responsibility principle* (SRP) in ESM with default exports

#### Description
In the example, an *ES module* `logger.js` is defined and the `Logger` class is exported as a *default export*.
In the main program, the class is imported and aliased to a custom local name.

| NOTE: |
| :---- |
| Remember that in order to enable using ES modules in Node.js you have to:
+ Update your `package.json` to include a top-level property `"type": "module"`
+ Update your `.eslintrc.yml` to configure the `parserOptions.sourceType: module` |

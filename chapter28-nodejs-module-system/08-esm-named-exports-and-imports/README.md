# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### 08 &mdash; Named exports and imports
> basic scenarios for *ES modules* `export` and `import`

#### Description
In the example, an *ES module* `logger.js` is defined and several types of exports are used. In the main program, those elements are imported to illustrate the different ways in which the API exported from the *ES modules* can be brought into scope.

| NOTE: |
| :---- |
| See how *ES modules* forces you to use the whole name `'./logger.js'` when importing the module. Using only `'./logger'` won't work! |

| NOTE: |
| :---- |
| Remember that in order to enable using ES modules in Node.js you have to:
+ Update your `package.json` to include a top-level property `"type": "module"`
+ Update your `.eslintrc.yml` to configure the `parserOptions.sourceType: module` |

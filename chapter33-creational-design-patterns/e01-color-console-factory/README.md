# Part 4: Node.js avanced patterns and techniques
## Chapter 33 &mdash; Creational design patterns
### Exercise 1: Color Console Factory
Create a class called `ColorConsole` that has just one empty method called `log()`. Then, create three subclasses: `RedConsole`, `BlueConsole`, and `GreenConsole`. The `log()` method of every `ColorConsole` subclass will accept a string as input and will print that string to the console using the color that gives the name to the class.

Then create a factory function that takes color as input such as `red`, and returns the related `ColorConsole` subclass. Finally, write a small command-line script to try the new console color factory. Hint: use [this](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color/41407246#41407246) to understand how to change colors in the console.

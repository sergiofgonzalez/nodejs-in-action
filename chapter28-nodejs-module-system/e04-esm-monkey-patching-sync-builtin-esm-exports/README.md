# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### Exercise 28.5 &mdash; Improving the robustness of monkey patching in the context of ES modules using `syncBuiltinESMExports`
> illustrates how the robustness of the monkey patching of `fs.readFile` can be improved by invoking `module.syncBuiltinESMExports` before and after enabling and disabling the mock.

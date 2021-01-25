# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### 04 &mdash; The **substack** module definition pattern
> the **substack** pattern for module definition consists in exporting a single function from the module assigning it to `module.exports` while exporting internal or secondary functionalities as properties of the exported function

#### Description
In the example, a simplistic logger module is defined in which the main exported function represents the *info* level method, and an additional `verbose` method is added to the exported function.
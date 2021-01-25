# Part 4: Node.js avanced patterns and techniques
## Chapter 33 &mdash; Creational design patterns
### Exercise 4: *Singleton* pattern: multiple instances and `peerDependencies`
#### `lib-logger@1.0.0`
Subproject required to illustrate how the singleton pattern may end up creating multiple instances when there are packages in an app that require incompatible versions of a given module.

See [README.md](../README.md) for more details.

##### Publishing instructions

Type in your terminal:

```
$ npm publish --registry=<your-npm-repository>
```
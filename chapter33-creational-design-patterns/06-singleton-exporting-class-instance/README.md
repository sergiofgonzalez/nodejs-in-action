# Part 4: Node.js avanced patterns and techniques
## Chapter 33 &mdash; Creational design patterns
### 06 &mdash; *Singleton* pattern: Exporting a class instance
> Illustrates how to implement the *Singleton* pattern by exporting a class instance.

| NOTE: |
| :---- |
| As seen in the [concepts](../README.md#singleton), there are caveats to implement successfully a *singleton* in Node.js when using modules that require different incompatible versions of the *singleton*. When that happens, you will end up having different *singleton* instances (one per each incompatible version that is imported). |

# Part 4: Node.js avanced patterns and techniques
## Chapter 34 &mdash; Structural design patterns
### Exercise 4: Virtual File System(./e04-virtual-file-system)
Modify our [Level DB filesystem adapter](12-adapter-level-up-fs-api) to write the file data in memory rather than in LevelDB.

#### Notes
Take into account that what it is done in this exercise is not an adapter, but rather, we create an object that has the same interface as fs.
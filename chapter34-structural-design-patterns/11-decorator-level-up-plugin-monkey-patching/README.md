# Part 4: Node.js avanced patterns and techniques
## Chapter 34 &mdash; Structural design patterns
### 11 &mdash; *Decorator* pattern: creating a `LevelUP` plugin using object augmentation (monkey-patching)
> Illustrates how to implement the *Decorator* pattern using object augmentation (monkey-patching) to create a small plugin for *LevelUP* database. In the example, we augment *LevelUP* to receive notifications when an object that satisfies a certain pattern is saved into the database.

The module uses the `level` package which bundles `LevelUP` along with the default adapter for `LevelDB` as the backend, called `leveldown`.

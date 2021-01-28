# Part 4: Node.js avanced patterns and techniques
## Chapter 34 &mdash; Structural design patterns
### 12 &mdash; *Adapter* pattern: creating a `LevelUP` adapter so that it works with the `fs` API
> Illustrates how to implement the *Adapter* pattern by creating an adapter that makes *LevelUP* API compatible with the `fs` API. 

The module uses the `level` package which bundles `LevelUP` along with the default adapter for `LevelDB` as the backend, called `leveldown`.

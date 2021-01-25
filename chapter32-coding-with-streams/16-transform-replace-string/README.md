# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### 16 &mdash; Transform stream that replaces occurrences of a given string
> Illustrates how to implement a `Transform` stream that replaces the ocurrences of a given string for other. Note that the algorithm to do so is not as evident as the one needed to replace a string in a buffer, as the string may come in different chunks when data is being streamed.

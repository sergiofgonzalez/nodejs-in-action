# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### Exercise 1 &mdash; Data compression efficiency
> Write a command-line script that takes a file as input and compresses it using the different algorithms available in the `zlib` module (Brotli, Deflate, Gzip). As an output, write a table that compares the algorithm's compression time and efficiency on the given file. Hint: this could be a good use case for the *fork pattern*, provided that you're aware of its performance considerations.

#### Solution details

The first version of the solution (`main_v0.js`) used plain and simple *fork* pattern with streams, but it was quite verbose. The implementation leveraged a `StreamTimeMonitor` to compute the duration of the process.

The second version examined the common parts of the first one, and refactored them into classes so that the degree of reusability was improved.

This solution also included a `Tabulator` class that helps displaying the results in a CLI table.
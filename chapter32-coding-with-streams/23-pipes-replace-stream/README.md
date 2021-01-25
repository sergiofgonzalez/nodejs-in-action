# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### 23 &mdash; Connecting streams with pipes to replace text
> Illustrates how to connect streams using pipes to read some text from *stdin*, replace some text according to some rules received as arguments through the command line and then pipe it to *stdout*.

#### Usage

The application expects the string to be replaced as the first string and the replacement string as the second argument.

```bash
$ echo hello, world! | npm start world Jason
hello Jason!
```
# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### 30 &mdash; Combining streams
> Illustrates how to combine streams using [`pumpify`](https://www.npmjs.com/package/pumpify) to create two combined streams: one the compresses and encrypts data, and one the decrypts and compresses data. Then, the combined streams are used as if they were a single, `Duplex` stream.

#### Usage
First run `npm run start-archive` which will create a compressed and then encrypted version of the file `input_clear_text.txt` using a combined stream. When doing so, the scrupt will output in the *stdout* the initialization vector used in the process, which will be needed for the unarchiving process.

To unarchive, run `npm run start-unarchive <iv>`, with `iv` being the initialization vector from the archiving process.
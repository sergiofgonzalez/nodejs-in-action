# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### Example 5: Parsing form encoded data from HTTP request
> Build a server that is able to accept and parse HTTP POST requests with form data using the low-level `http` method

#### Solution details

As we don't have any sophisticated module infrastructure, in order to read the body of the `request` object received we need to handle it as a *readable* stream.

Once the body has been read, the `querystring` core module can be used to transform the raw data materialized from reading the string into a JavaScript object.
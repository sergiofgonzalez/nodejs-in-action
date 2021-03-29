# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 7: AWS Lambda
#### 01 &mdash; Lambda function: Website health check
> simple lambda function that checks the health of an array of websites received via environment variables


##### Notes

+ Build your program following the pattern:
  + `index.js` for your lambda function
  + `main.js` or `/test` for your unit testing
+ Accommodate the function in your `index.js` to the expected signature for an *AWS Lambda function*: `exports.handler = async (event) => { ... }`
+ Implement your lambda function that should react depending on the `event` and/or environment variables received.
+ Once comfortable with the implementation, type `npm run package` to package as a *.zip* file that can be uploaded to the *Lambda console*.
+ Remember that at the time of writing *ES modules* are not supported.

```javascript
exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
```

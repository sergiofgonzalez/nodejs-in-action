# e01-grokking-express-scaffolding
> experimenting with the *Express* skeleton

## Description

A basic JavaScript frontend application served with the *Express* skeleton.

It features the following functionality:
+ Serving an image from the `public/` directory to the browser
+ Issuing JSON based GET/POST requests
+ Sending form data using `Content-Type: multipart/form-data`

### Error Handling Considerations

Most of the grokking has been around error handling:
The *Express* error handling signature must be:
```javascript
app.use((err, req, res, next) => {
  ...
});
```
even if you're **not** invoking next! 

The difference between invoking `next(err)` or not invoking it at the end of the error handler strikes in the stack trace being printed on the server's console. I tend to prefer having instead not having it, so i'm using it.

Another interesting point is the message flow and sending the error details:
+ When the error comes from the server directly (e.g. when you access a non-existing route) you can configure *Express* to respond with an HTML *error* view. This is because it is the browser the one issuing the request and there is no other code waiting for the response. I can imagine that this is true for all static pages.
+ When the error comes from the JavaScript code the situation is different, as there will be logic issuing a `fetch` and *awaiting* the result. In this case, although you can return a pretty HTML error page, it will not be automatically displayed. In this case, i've decided to return a JavaScript object with the error data instead, so that the JavaScript code can decide to show an alert, etc.
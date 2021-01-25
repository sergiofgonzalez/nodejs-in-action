# 04-connect-error-handling
> the basics of error handling Connect middleware

## Description

Error handling middleware is like regular middleware except for the fact that it receives an error as the first argument:
```javascript
function errorHandler() {
  return (err, req, res, next) => {
    console.error(`Error found: ${ err }`);
    res.end(err.message);
    next();
  };
}
```

When *Connect* encounters an error, it'll start invoking only error-handling middleware.
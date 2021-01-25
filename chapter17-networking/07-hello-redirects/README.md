# 07-hello-redirects
> illustrates how to follow redirects using only Node.js *core* modules

## Description
This example illustrates how to correctly follow redirects using *core* modules. In the example we use `http` module to make a GET request to a URL that generates a redirection.

Node.js `http` core module provides a convenient API for handling HTTP requests, but it doesn't follow redirects automatically. The redirect technique is is commonly used to prevent sending forms twice, so it is important to understand how to handle it to prevent creating redirect loops or similar issues.

According to the specification, all of the HTTP status codes related to redirection begin with a 3:
| HTTP Status Code | Description        |
|------------------|--------------------|
| 300              | Multiple choices   |
| 301              | Moved permanently  |                  
| 302              | Found              |
| 303              | See other          |
| 304              | Not modified       |
| 305              | See proxy          |
| 307              | Temporary redirect |

The example is a bit contrived, so it is worth to have some annotated code walkthrough. However the general idea is as follows:
+ Make an HTTP request to the given URL
  + if status code === 200 => we're done!
  + if status code === 3xx => 
    + have we reached the redirection limit? if so, we might be in a redirection loop, so we should throw an error
    + increment the number of redirects taken, use the `location` field from the response headers as the location for the next attempt

Let's start with the class that manages the class state. We're defining a custom class `Request` that controls the max redirects allowed and the count of the current redirects we've taken. The class will also feature a `get` method that will be used to perform the GET request. Our `get` method accepts a normalized callback.

```javascript
class Request {
  class Request {
    constructor() {
      this.maxRedirects = 10;
      this.redirects = 0;
    }

    get(href, (err, res) = {...}) {
      ...
    }
}
```

Let's verify in detail what does the `get` method do, by looking at its main body

```javascript
get(href, cb) {
  const uri = url.parse(href);
  const options = { host: uri.host, path: uri. path };
  const httpGet = uri.protocol === "http:" ? http.get : https.get;

  console.log("GET:", href);

  function processResponse(res) {
  ...
  }

  httpGet(options, processResponse.bind(this))
    .on("error", err => cb(err));
}
```

This method, accepts a URL and a normalized callback, and the first thing it does is parse the given URL into Node.js own format (an URI object with a `host` and `path` properties) and then inspects the protocol to check if HTTP or HTTPS should be used.
Once this is established, either `http.get(uriObj, res => {...})` or `https.get(uriObj, res => {...})` is invoked using the `httpGet(options, processResponse.bind(this))`.
This construct uses the recently created URI object, and establishes the `processResponse(res)` function as the callback. Note also that we use `Function.prototype.bind(this)` to obtain a function that has the current `this` object attached to it. This is important to be able to track the current redirects count and the maximum. If we wouldn't do that, the `this` found in the callback would be completely differen from the one we intend to use (we want the `this` that results from the instantiation of the `Request` class).

Long story short, `processResponse` class will be called by either `http.get` or `https.get` when the call has succeeded, and `this` will reference an instance of `Request` and therefore `this.get`, `this.redirects` and `this.maxRedirects` will be available.

Now let's have a look at the `processResponse(res)` itself. We know that, as a callback for `http.get` it should receive a *response* object.

```javascript
function processResponse(res) {
  if (res.statusCode >= 300 && res.statusCode < 400) {
    if (this.redirects >= this.maxRedirects) {
      this.error = new Error(`Too many redirects for: ${ href }`);
    } else {
      this.redirects++;
      href = url.resolve(options.host, res.headers.location);
      return this.get(href, cb);
    }
  }
  res.url = href;
  res.redirects = this.redirects;

  console.log("Redirected:", href);

  function end() {
    console.log(`Connection ended: redirects taken: ${ this.redirects }`);
    cb(this.error, res);
  }

  res.on("data", data => {
    console.log("Got data, length:", data.length);
  });

  res.on("end", end.bind(this));
}
```

The logic is as follows:
+ We first check if we're in a redirect situation or not (statusCode === 3xx)
  + If we're in a redirect:
    + we check if we've reached the max configured redirections, if that is the case, we populate the error field of the request.
    + otherwise, we are allowed to follow the redirection, so we use the `url.resolve(from, to)` method, which resolved a target URL relative to a base URL. After that, we perform a recursive call to `Request.get()` which will initiate the whole process, but with an incremented count of the `redirect` property.
  + If we're not in a redirect:
    + we establish listeners on `"data"` to display the length of the payload read, and `"end"` to detect when the server has signaled that the response is complete. On that case, we invoke the normalize callback received at the beginning of the program (the user-supplied callback), again binding the `Request` instance so that `this` is pointing to where we find the `Request` properties.
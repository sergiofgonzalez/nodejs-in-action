# Part 4: Node.js avanced patterns and techniques
## Chapter 33 &mdash; Creational design patterns
### Exercise 2: Request builder
Create your own *Builder* class around the built-in `http.request()` function. The builder must be able to provide at least basic facilities to specify the HTTP method, the URL, the query component of the URL, the header parameters, and the eventual body data to be sent.

To send the request, provide an `invoke()` method that returns a `Promise` for the invocation..


#### Solution

Firstly, I implemented `request-client_v0.js` to grasp how the `http.request` worked. Then I created the `request-builder` which I kept as simple as possible.

To *promisify* the response I created a `Promise` from scratch in the `invoke()` function.

To test it:

Type `npm run start-server` on a session and `npm run start-client` on another session. The server will just echo the information received in the response to the client.
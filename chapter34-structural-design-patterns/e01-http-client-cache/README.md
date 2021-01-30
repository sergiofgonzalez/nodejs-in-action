# Part 4: Node.js avanced patterns and techniques
## Chapter 34 &mdash; Structural design patterns
### Exercise 1: HTTP client cache
Write a proxy for your favorite HTTP client library that caches the response of a given HTTP request, so that if you make the same request again, the response is immediately returned from the local cache, rather than being fetched from the remote URL.

| NOTE: |
| :---- |
| The example is used to illustrate the *Proxy* concept, not to implement a robust caching mechanism on top on *superagent*. For example, the query parameters are not considered when caching. |
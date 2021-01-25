# e01-async-waterfall-rss-feed
> rewriting the RSS Feed example using the async library

## Description
Simple rewrite of the *serial-flow-custom* example, but using the async library.

The application displays a single article's title and URL from a list of RSS feeds chosen from a file in the local file system.
The structure of the RSS file is just a list of RSS URLs, one feed per line:
```
http://www.bbc.co.uk/programmes/b00lvdrj/episodes/downloads.rss
https://www.npr.org/rss/podcast.php?id=344098539
https://www.npr.org/rss/podcast.php?id=510208
```

### Implementation Details
The modifications are extremely simple &mdash; the global `next` function is removed and the array of functions is passed to the `async.waterfall` function. The callback function (`next`) that async provides, is then passed as the last parameter to the functions.

### Additional info
The example relies on two Node.js modules:
+ *async* &mdash; utility module for async JavaScript flows
+ *request* &mdash; client that simplifies HTTP requests
+ *htmlparser* &mdash; helper to turn HTML data into JavaScript data structures
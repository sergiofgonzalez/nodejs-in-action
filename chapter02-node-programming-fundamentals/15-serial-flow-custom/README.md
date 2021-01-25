# 15-serial-flow-custom
> demistifying serial flow handling

## Description
Simple application that illustrates how to perform custom handling of async serial flow.

The application displays a single article's title and URL from a list of RSS feeds chosen from a file in the local file system.
The structure of the RSS file is just a list of RSS URLs, one feed per line:
```
http://www.bbc.co.uk/programmes/b00lvdrj/episodes/downloads.rss
https://www.npr.org/rss/podcast.php?id=344098539
https://www.npr.org/rss/podcast.php?id=510208
```

### Implementation info
The application starts by defining each of the application steps in its own function:
+ `checkForRSSFile` &mdash; verifies that the RSS file exists and can be accessed
+ `readRSSFile` &mdash; reads the file and builds an array with its contents. Then its select one of the items randomly and returns it.
+ `downloadRSSFeed` &mdash; access via HTTP the RSS file received as an argument and returns its body
+ `parseRSSFeed` &mdash; parses the HTML body of the RSS feed and prints in the console the title and URL of the first item of the RSS.

Then, the flow control function is defined. It consists in defining an array with the functions in the order that they should be called (that is `checkForRSSFile`, then `readRSSFile`, etc.), and define a function `next` that will be managing the flow.

This `next` function signature is defined as:
```JavaScript
function next(err, result) {...}
```
The logic of the function consists in checking if the `err` argument comes populated, and if it is so halting the flow (by throwing an Error). Otherwise, we *dequeue* the first element from the function array and call it providing the `result` argument.

The application is then started by calling `next()`, which will trigger the invocation of the first function of the series.

### Additional info
The example relies on two Node.js modules:
+ *request* &mdash; client that simplifies HTTP requests
+ *htmlparser* &mdash; helper to turn HTML data into JavaScript data structures
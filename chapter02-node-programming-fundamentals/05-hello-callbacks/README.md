# 05-hello-callbacks
> Node.js async programming using callbacks

## Description
Illustrates how to use callbacks to handle *one-off* events. In the example, a simple HTTP server that does the following is implemented:
+ Reads a JSON file in the local filesystem containing the titles of recent posts
+ Reads a basic HTML template asynchronously from the local filesystem
+ Assembles an HTML page containing the titles
+ Sends the HTML page to the user

Note that the example uses three levels of nested callbacks. This will be improved in the next example.

### Additional info
The example uses `http` and `fs` core modules to create the HTTP server and read the JSON file and template.

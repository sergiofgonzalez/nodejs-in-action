# 06-hello-callbacks-refactored
> refactoring to reduce cluttering when using callbacks

## Description
In the previous example, an application was developed that performed the following tasks:
+ Reads a JSON file in the local filesystem containing the titles of recent posts
+ Reads a basic HTML template asynchronously from the local filesystem
+ Assembles an HTML page containing the titles
+ Sends the HTML page to the user

In this new version, we refactored the previous code using named functions to improve the readability of the application.

### Additional info
The example uses `http` and `fs` core modules to create the HTTP server and read the JSON file and template.

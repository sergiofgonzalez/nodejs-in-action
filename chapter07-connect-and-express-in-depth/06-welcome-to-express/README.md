# 06-welcome-to-express
> creating a skeleton for a full-fledged Express based app

## Description

This example creates a skeleton for a complete Express based app requiring to serve both resources and HTML documents.
The scaffolding and dependencies are exactly like the ones you'd find using [express-generator](https://www.npmjs.com/package/express-generator) but into the general project structure i've been using in this repo.

The skeleton is runnable, with a couple of *routes* enabled for testing.

### Project Files
The following section gives details about the different files and folders included in the project.
The structure is pretty much self-explanatory except for `bin/www` script which is used to start the application.

```
./app/
|-- src/
|---- bin/
|------ www               
|---- public/
|------ images/
|------ javascript/
|------ stylesheets/
|-------- styles1.css
|------ favicon.ico
|---- routes/
|------ index.js
|------ users.js
|---- views/
|------ error.ejs
|------ index.ejs
|---- index.js
```

Let's see each of the relevant aspects in detail:

### package.json

We take advantage of the way in which the application can be started using the `bin/www` runnable script using an configurable logger and therefore, we tailor the `start` task as:
```json
  "config": {
    "debugModules": "06-welcome-to-express:server"
  },
  "dependencies": {
...
  },
  "scripts": {
...
    "start": "DEBUG=${npm_package_config_debugModules:-$npm_package_name} node ./app/src/bin/www",
```

Thus, when we run `npm start` we will inject the `DEBUG` variable as configured to obtain enable logging in the given modules. Note that `debugModules` allow us to use *wildcards* as in `DEBUG=*` and also a comma-separated list of values `DEBUG=module1,modules2`.


The following dependencies are also introduced:
+ `body-parser` &mdash; body parsing middleware that handles JSON body parsing, Raw body parsing, Text body parsing and URL-encoded form body parsing. Note that it will not handle *multipart* bodies.
+ `cookie-parser` &mdash; cookie management middleware that parses `Cookie` header and populates `req.cookies`.
+ `ejs` &mdash; embedded JavaScript templates with similar functionality to Java Server Pages (JSP)
+ `morgan` &mdash; HTTP request logger middleware
+ `serve-favicon` &mdash; middleware for serving favicon in the most optimized way
+ `debug` &mdash; a debugging utility that follows Node.js core's debugging technique. The most interesting part is that it allows you to select which modules should be debugged based on the contents of the `DEBUG` environment variable.

### index.js
The main *Express* application program.

The first lines contain all the `require` statements, including the routes that will be exposed. This allows for a scalable project structure as each endpoint will be taken care of in a separate file.

Right after that, we initialize the *Express* framework using `const app = express()`, and start configuring it using the `app.set` method and `app.use` method for the middleware.

This is the configuration we do:
+ Set up the view egine by configuring where our views will be located, and the view engine we'll use to `ejs`.
+ Set up the favicon middleware for efficient serving of `favicon.ico`
+ Set up the logging mechanism using `morgan` which will automatically display debugging information about the requests being processed automatically.
+ Enable the parsing on request's body in JSON and *urlencoded* format. Note that in the latter case, we are not using `qs` for extended parsing, thus the `extended: false`.
+ Enable the parsing of cookies
+ Enable the serving of static resources using `express.static`. Those resources will be served from the `public/` directory.

Right after that, we enable the routes for `/` and `/users`.

Then we have a couple of general error handling methods:
+ First we create an empty route handler that will become a fallback when no route is defined for the incoming request. To enable this functionality we just define a handler for `app.use((req, res, next) = {...});
+ Then we create a general error handler, which is recognized because it features a particular signature `app.use((err, req, res, next) => {...});`. The error handler will display additional information if the app environment is set to `"development"` but will hide additional information otherwise.

Finally, we export the *Express* `app` as a module so that it can be used from other modules (i.e. `/bin/www`).

### www

The startup script for our application. There are a lot of interesting things about this program/script.

In the first line, we have a *Node.js* shebang:
```bash
#!/usr/bin/env node

// A runnable Node.js program comes here!

```

This will allow running the script from the shell using `./app/src/bin/www` provided that the `www` file has been given execution permissions.


First, we have the `require` section in which we get our *Express* app, the `http` module and the configuration of the `debug`module. This module must be given a *string* that identifies the modules, so that it can enabled and disabled separately. In our case, we decide to set the tag to the name given in the `package.json` followed by `:server` so that we'd have `"06-welcome-to-express:server"`.

Then we read the port from the environment variable and bind it to the application using `app.set`.

Right after that we create the HTTP server using the standard module and start listening on the configured port:
```javascript
const server = http.createServer(app);
server.listen(port);
```

Finally, we define handlers for `"error"` and `"listening"` events triggered from the server. The first one gives us the opportunity to give more detailed information about the error. The second one just informs the user that the server has been established.


### public

The frontend app will be stored under the public directory. There is nothing groundbreaking here.

### routes

The routes directory contains the enabled endpoints. For illustration purposes, `index.js` contains the minimal implementation of an endpoint that renders an HTML document and `users.js` contains the minimal implementation of and endpoint that returns a JSON object.

### views

Contains the *EJS* templates used in the application. Those are very similar to *JSP* but without the boilerplate typically associated with that template language.
In order to bind information from the server in the template you'd use in the HTML:
```html
 <h1 class="display-3">Welcome to <%= title %>!</h1>
```

and then in your server code:
```javascript
res.render("index", { title: "Express" });
```

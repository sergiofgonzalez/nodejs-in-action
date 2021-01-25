# 07-full-express-app
> experimenting with the *Express* skeleton

## Table of Contents
+ [Application Description](#application-description)
  + [Known Errors and Improvements](#known-errors-and-improvements)
+ [Express Application Topics](#express-application-topics)
  + [Express Configuration](#express-configuration)
  + [View Topics](#view-topics)
    + [View Caching Considerations](#view-caching-considereations)
    + [View Lookup Considerations](#view-lookup-considerations)
    + [Mechanisms for Exposing Data to the Views](#exposing-data-to-the-views)
      + [Using the Express Session](#using-the-express-session)
    + [Route Specific Middleware](#route-specific-middleware)
  + [Routing Topics](#routing-topics)
    + [Declaring Express Routes](#declaring-express-routes)
    + [Route-specific Middleware](#route-specific-middleware)
  + [Handling Form Data](#handling-form-data)
  + [User Authentication](#user-authentication)
    + [Authenticating API Users](#authenticating-api-users)
  + [Pagination Considerations](#pagination-considerations)
  + [Content Negotiation Considerations](#content-negotiation-considerations)
  + [Error Handling](#error-handling)
  + [Redirection Tips](#redirection-tips)
  + [Booting up Redis](#booting-up-redis)
  + [Testing the API](#testing-the-api)



## Application Description

In this project we build a complete Express application that supports both user interaction and programmatic access. The application allows users to post messages that will be displayed in sequence.

Messages are publicly visible, but only registered users can post messages. 
The application provides self-registration for new users.

The application will:
1. Allow users to register accounts, sign-in and sign-out
2. Users should be able to post messages (entries)
3. Site visitors should be able to paginate through entries
4. There should be a simple REST API supporting authentication

Both programmatic and interactive usage is provided:
+ API endpoints (programmatic):
  + GET /api/user/:id &mdash; get information for the user with the given id (no authentication needed)
  + GET /api/entries &mdash; get a list of entries (no authentication needed)
  + GET /api/entries/page &mdash; get a single page of entries (no authentication needed)
  + POST /api/entry &mdash; creates a new message (authentication needed)
+ Web UI routes (interactive):
  + GET /post &mdash; returns HTML form for a new entry
  + POST /post &mdash; sends the HTML form to the server
  + GET /register &mdash; returns the HTML registration form
  + POST /registers &mdash; sends the HTML registration form to the server
  + GET /login &mdash; returns the sign-in form
  + POST /login &mdash; sends the sign-in information to the server
  + GET /logout &mdash; sends the sign-out signal for the user

### Known Errors And Improvements

+ [ ] (improvement) user/password value fields are lost when a authentication fails. Username should not be cleared.


## Express Applications Topics

### Express configuration

In addition to configuring environment-specific functionality such as `app.set("view engine", "ejs")`, Express also lets you define custom configuration key/value pairs:

+ `app.set(key, value)`
+ `app.get(key)`
+ `app.enable(key)`
+ `app.disable(key)`
+ `app.enabled(key)`
+ `app.disabled(key)`

You can use an *environment based* configuration using `NODE_ENV` environment variable and `env` Express variable:
+ `NODE_ENV` is an environment variable originated in *Express* but that has been widely adopted for many other Node frameworks. By using that variable you can provide a different behavior depending on the environment. The names for the environments are completely arbitrary, but *Express* sets the `env` variable to `development` if NODE_ENV is not set. Otherwise, Express uses the value of `NODE_ENV` for `app.get("env")`.

For example, you can do:
```bash
$ NODE_ENV=production npm start
index:server Application running with env = production +72ms
index:server Application running with NODE_ENV = production +0ms
```

And if you don't set a value for `NODE_ENV` you will get:
```bash
$ npm start
index:server Application running with env = development +2ms
index:server Application running with NODE_ENV = undefined +0ms
```

### View Topics

#### View Caching Considerations
The `view cache` setting is enabled in the production environment and disabled in other environments.
```bash
$ NODE_ENV=production npm start  # app.get("view cache") -> true
$ npm start  # app.get("view cache") -> undefined
```

When the *view cache* is enabled, subsequent render calls for a particular view will not re-read the view from disk, which will boost performance. However, if you enable this mechanism in *development* changing the view will require restarting the app to view the changes. 

#### View Lookup Considerations

To render a view from *Express*, you typically use the `render` method on the `response` object as in:
```javascript
res.render("index", { title: "Express" });
```

You will typically use the following snippet to configure the directory that Express will use for the view lookup:
```javascript
app.set("views", path.join(__dirname, "views"));
```

The process of looking up a view when invoking `res.render(name)` is similar to Node's require:
+ look for a file matching the name given exists with an absolute path
+ look for a file matching the name given relative to the configured `views`directory
+ look for an index file at the given directory

Depending on the default view engine used through:
```javascript
app.set("view engine", "ejs");
```

You will be configuring the default extension for `res.render(viewName)` operations. However, Express lets you use additional templating engines just by appending the specific file extension to the `viewName`.

#### Mechanisms for Exposing Data to Views
You can use the following mechanisms to pass view variables to `res.render`, order by precedence:
+ pass local variables in the call `res.render(viewName, {key1: value1, key2: value2})`
+ `app.locals` &mdash; can be used for application-level variables
+ `res.locals` &mdash; can be used for request-level local variables

By default, Express exposes one application-level variable called `settings` to the view, which is the object containing all of the values that have been previously set with `app.set`.
For example, `app.set("title", "My Application")` would expose `settings.title` in the template so that you could use:
```html
<!DOCTYPE html>
<html>
  ...
  <body>
    <h1><%= settings.title %>
  </body>
</html>
```

In the example, we use the `messages.ejs` template to display errors to the user. This template uses the `locals.messages`:
```html
<% if (locals.messages) { %>
  <% messages.forEach(message => { %>
    <div class="<%= message.type %>">
      <strong><%= message.string %></strong>
    </div>
  <% }) %>
  <% removeMessages() %>
<% } %>
```

On the sender side, you'll have to add your messages you want to be displayed to the `res.local.messages`. However, you must take into account that res.locals doesn't persist across redirects, so you'll typically have to store messages between requests using sessions.

##### Using the Express Session
A common web pattern is the POST/REDIRECT/GET (PRG), in which a user requests a form, the form is submitted as an HTTP POST request and the user is then redirected to another web page. This final page will depend on whether the form data is considered valid or not. This PRG pattern allows you to prevent duplicate form submissions.

In Express, when a user is redirected, the contents of `res.locals` are reset, therefore, if you want some data to persist across PRG you'll have to use the session.
```javascript
const session = req.session;
session.messages.push({ type: type, string: msg });
```

This features requires the `express-session` module, which must be initialized using:
```javascript
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
```

**NOTE**
It is recommended to place the session middleware after the cookie middleware has been inserted.

In the example, we also define a `messages.js` middleware that copies `req.session.messages` to `res.locals.messages` so that it is readily available to the *view template*.

As the session is bound to a user, it is required to remove the session when the user logs out or disconnects:
```javascript
req.session.destroy(err => {
  if (err) throw err;
  res.redirect("/");
});
```

### Routing Topics

The primary function of routing is pairing a URL pattern with response actions for that URL. Express allows you to do that, but it also allows you to pair a URL with middleware to provide functionality such as validation.

#### Declaring Express Routes
There are several ways of declaring the routes that will be handled by your application.

In the example application, most of the routes declared in the `index.js` file follows this syntax:
```javascript
const entries = require("./routes/entries");
app.get("/", entries.list);
```

In the `./routes/entries` file we export several actions that will be associated to responses to a particular URL. In the example above, the URL `/` will be handled by the logic specified in `entries.list`.

Alternatively, you can also use this approach:
```javascript
const info = require("./routes/info");
app.use("/info", info);
```

In this latter approach, `./routes/info` uses the *Express* Router to configure the pairing:
```javascript
const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.send(...);
});

router.post("/", (req, res) => {
  res.send(...);
});


module.exports = router;
```

Both approaches are valid.

#### Route-specific Middleware

*Express* allows you to define middleware that is only triggered for a particular route. This is extremely useful to implement configurable validation logic, like the one used in the example for validating the form data:
```javascript
app.post("/post", validate.required("entry[title]"), validate.lengthAbove("entry[title]", 4), entries.submit);
app.post("/register", validate.required("user[name]"), validate.required("user[pass]"), register.submit);
```

In this case, we defined a middleware module `validate` that exports several configurable methods. As it is customary for middleware modules, each exported function returns another function with signature `(req, res, next)`:
```javascript
exports.required = field => {
  return (req, res, next) => {
    ... logic for validating given field ...
  };
};

exports.lengthAbove = (field, len) => {
  return (req, res, next) => {
    ... logic for validating given field lenght is > len ...
  };
};
```

### Handling Form Data

The example application features forms to let users log in and register, and to let users post new messages. The forms are served to the browser when a HTTP GET request for the corresponding route is received:
```javascript
# index.js
app.get("/post", entries.form);
...

# routes/entries.js
exports.form = (req, res) => {
  res.render("post");
};
```

If you have a look at the view, you will see that the following syntax is used in the form elements:
```html
<form action="/post" method="POST">
  <input type="text" name="entry[title]" class="form-control" id="postTitleInput" placeholder="Enter the post title">
  <textarea class="form-control" id="postBodyTextArea" name="entry[body]" rows="5"></textarea>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

Note how input names are declared as `entry[title]` and `entry[body]`. When the form is submitted by the user, the form data will be `entry%5Btitle%5D=TitlePost&entry%5Bbody%5D=TitleBody`. When using this approach, you will need to enable extended urlencoded body parsing:
```javascript
app.use(bodyParser.urlencoded({ extended: true }));
```

And, when the form is submitted, you will automatically receive input data in the request body:
```javascript
exports.submit = (req, res, next) => {
  const data = req.body.entry;

  const entry = new Entry({
    title: data.title,
    body: data.body
  });
...
};
```

### User Authentication

A `User` model that accepts an object and merges the object's properties into its own. When the user is first created, it'll need to have a `pass` property set to the user's password. The user-saving logic will replace the value of that property with a hash generated by the `bcrypt` module. This hash will also be salted, meaning that the password contains an additional component called *salt* that acts as a private key for the hashing mechanism. With a salted password, two users with the same password will have different hashes.

The authentication procedure is actually handled by the `authenticate` method defined in the `User` model:
```javascript
  static authenticate(name, pass, cb) {
    User.getByName(name, (err, user) => {
      if (err) return cb(err);
      if (!user.id) return cb();

      bcrypt.hash(pass, user.salt, (err, hash) => {
        if (err) return cb(err);
        if (hash === user.pass) return cb(null, user);
        cb();
      });
    });
  }
```

+ We first look up the user by name
+ If the user does not exist, or if an error is found, we invoke the given callback with empty params (meaning invalid credentials)
+ If the user is found, we calculate the hash for the user and check if it matches: if it does, we invoke the given callback passing the user data.

Therefore, the authenticate method should be used as follows:
```javascript
  User.authenticate(data.name, data.pass, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      req.session.uid = user.id;
      res.redirect("/");
    } else {
      res.error("Sorry! Invalid credentials");
      res.redirect("back");
    }
  });
```

Note that when the user has been successfully authenticated, we store the `user.id` in the *HTTP session* so that it is available while the user is interacting with the application.

This allows us, for example, to show the *username* in the navbar. This is not directly used by the templates, but rather, we define a the `user` middleware, which reads the `user.id` from the `req.session` and exposes the `user` in the `res.locals`:
```javascript
module.exports = (req, res, next) => {
  const uid = req.session.uid;
  if (!uid) {
    return next();
  }
  User.get(uid, (err, user) => {
    if (err) {
      return next(err);
    }
    req.user = res.locals.user = user;
    next();
  });
};
```

#### Authenticating API Users
In the example, API users are authenticated using *Basic Authentication*.
The first thing that we do is enable a middleware that will kick-in for all the API related requests:
```javascript
// api.auth should be invoked before the user middleware
app.use("/api", api.auth);
app.use(user);
``` 

This causes all requests to `/api` to use `api.auth` as middleware.

Then, to enable the basic authentication we use the `basic-auth` module which provides a function that decodes the user and password from the `Authorization` HTTP header. We put that credentials on the request object on the `auth` method:
```javascript
const auth = require("basic-auth");
req.remoteUser = auth(req);
```

Once we have remoteUser in the request, we can decide what methods require authentication and which dont.

Note that after authentication, we also run the `user` middleware which populates `res.locals.user` with the user information received in the request.


### Pagination Considerations

Pagination is implemented with the `page` middleware. However, an additional function is defined in the `index.js` that validates the `page` param whenever available. 

### Content Negotiation Considerations

Content negotiation is what enables a client to specify what format it's willing to accept and which it would prefer.

In our application, we support both HTML (for interactive users) and JSON (for programmatic access). HTTP provides the content negotiation mechanism via the `Accept` header field:
```
Accept: text/plain; q=0.5, text/html
```

The previous header spec says that the application that prefers html but it is willing to accept plain text. The `qvalue` is the quality value that indicates that `text/html` it's favored by 50% over `text/plain`.

In Express, you can use the `res.format()` which accepts an array of MIME types and callbacks, although you can also use `json` for `application/json` and `xml` for `application/xml`:
```javascript
res.format({
  html: () => {
    res.render("5xx", { msg: msg, status: res.statusCode });
  },
  json: () => {
    res.send({ error: msg });
  },
  text: () => {
    res.send(`${ msg }\n`);
  }
});
```

**Note**
Failing to find an applicable format for the response will cause the server to stop. However, *Express* provides:
```javascript
  res.format({
    html: () => {
      res.render("5xx", { msg: msg, status: res.statusCode });
    },
    json: () => {
      res.send({ error: msg });
    },
    text: () => {
      res.send(`${ msg }\n`);
    },
    default: () => {
      res.status(406).send("Not Acceptable");
    }
  });
```

### Error Handling

Error handling is managed in `routes/index.js`. There, two methods are defined:
+ `notFound` &mdash; which will handle routed that have not been defined
+ `error` &mdash; which will handle any other type of error

Internal errors will be automatically handled by the error handler, but you can also force the execution of the error handler for business logic errors by invoking `next` with the appropriate error information.
For example, if the authorization fails for a given user, we do:
```javascript
  if (!res.locals.user) {
    next({type: "authorization"});
  }
```

### Redirection Tips
A *redirect* action sends a response code that redirects the browser to an specific location.

In Express applications you have the `redirect` method on the response object which can be used for such purposes:
```javascript
res.redirect("/"); // redirects to home page
res.redirect("back"); // in a POST/REDIRECT/GET pattern, redirects the user to the initial form
```

Note that `res.redirect("back")` is used to redisplay a form in case of a validation error.

### Booting up Redis

The easiest way to set up a Redis backend is to start up a *Docker* container. You can have a look at https://github.com/sergiofgonzalez/docker-book/tree/master/03-sample-containers for several examples:

```bash
$ sudo docker start redis32-container
```

### Testing the API

#### `/api/user/:id`
```bash
curl http://localhost:5000/api/user/1 -H "Accept: application/json"
```

#### `/api/entries/:page`
```bash
curl http://localhost:5000/api/entries/0 -H "Accept: application/json"
```

#### `/api/entries/:page`
```bash
curl http://localhost:5000/api/entries/0 -H "Accept: application/json"
```

#### `/api/entry`
Unauthorized (missing authentication details):
```bash
curl -H "Content-Type: application/json" -H "Accept: application/json" \
--data '{"entry": { "title": "Post from API", "body": "This post has been registered from the API" }}' \
http://localhost:5000/api/entry -v
```

Unauthorized (invalid authentication details):
```bash
curl -H "Content-Type: application/json" -H "Accept: application/json" \
--data '{"entry": { "title": "Post from API", "body": "This post has been registered from the API" }}' \
http://sergio:secret@localhost:5000/api/entry -v
```

Authorized:
```bash
curl -H "Content-Type: application/json" -H "Accept: application/json" \
--data '{"entry": { "title": "Post from API", "body": "This post has been registered from the API" }}' \
http://sergio:supersecret@localhost:5000/api/entry -v
```

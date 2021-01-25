# 00-prj-template
> Node.js project template with build tasks based on NPM

## Description
Simple project template for your Node.js projects.

Includes the following build tasks:
+ `start` &mdash; lints and runs the main application
+ `lint` &mdash; lints all the source code under `app/src` directory
+ `debug` &mdash; runs the main application in debug mode. Allows for remote debugging if `debugHost` variable is configured.
+ `dev` &mdash; enables continuous development mode using `nodemon` on the application sources
+ `test` &mdash; executes the tests found under `app/tst` directory. As a *pre* step, the test code is linted.


### Configuration Items
A few extra configuration items have been used in the project template to allow extra customization.

### Configuring the Main Program
Instead of hardcoding the application main program, the `main` property found in the `package.json` is used instead:
```json
{
  "name": "your-application-name",
  "version": "x.y.z",
  "description": "Your application description",
  "main": "your-app-main-program.js",
  "engines": {
...
```

### Configuration for remote Debugging
To enable remote debugging with the new `--inspect` option, a global *npm* variable named `DEBUG_HOST` has been defined. If the variable is not found, `127.0.0.1` is used instead, so no remote debugging will be allowed.

To define the variable, you can either do:
```bash
$ npm set DEBUG_HOST <your_remote_debugging_host>
```

or simply, edit your `~/.npmrc` file to include the entry for the variable:
```bash
$ cat ~/.npmrc
save-exact=true
loglevel=silent

; This variable can be used to enable remote debugging
DEBUG_HOST=jsdev
```

### Linting with eslint
Linting is configured with eslint with the parser and modules prepared for ES6 and latest JavaScript additions like async-await.
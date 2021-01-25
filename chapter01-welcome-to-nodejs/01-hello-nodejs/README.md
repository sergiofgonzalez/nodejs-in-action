# 01-hello-nodejs
> starting project template for Node.js in Action examples

## Description
Establishes the folder structure and the basic development scripts for *Node.js in Action* examples. Note that `npm` is used as the build tool with the following actions (which are all defined in the package.json, as they are not too convoluted yet), and `eslint` is used for linting JavaScript source code.

### Folder structure
+ Source code &mdash; must be placed under `public/src/`.
+ Tests &mdash; must be placed under `public/tests/`.
+ Distribution &mdash; once build tools have been applied to the source code, the results will be copied to `build/` directory.

### Tasks
+ `npm start` &mdash; executes the result of the build.
+ `npm run lint` &mdash; executes the linting of the JavaScript source code using ESLint[http://eslint.org/] using the rules defined in the YML found in the project directory.
+ `npm run clean` &mdash; cleans the release directory (`build/`).
+ `npm run copy` &mdash; copies the contents of the source (`public/src/`) directory to the build (`build/`) directory.
+ `npm run build` &mdash; runs the build tasks consisting on cleaning the build directory, linting the source code and copying the sources to the build directory. If any of the aforementioned tasks fails, the process is stopped. Note that if the linting fails, the build directory will be empty &mdash; this is intentional.
+ `npm run debug` &mdash; calls the `node-debug` command on the application.
+ `npm dev` &mdash; invokes `nodemon` configured for watching `*.js` and `*.json` files found under `public/src/`

### Outstanding Topics
+ No tests: folder structure and tasks will have to be revisited.

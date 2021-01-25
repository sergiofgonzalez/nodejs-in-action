# e06-hello-require-module-groups
> grouping related files together under a directory and loading them in one single `require`

## Description
The example illustrates how you can group several modules in a single directory, then provide an `index.js` module that just requires what's exported in those modules.
From the main program, you just have to *require* the name of the directory that holds them to have access to everything that is *exported* in that directory.

The module that groups the exported functionality looks like:
```javascript
module.exports = {
  one: require("./one"),
  two: require("./two")
};
```

And the main program will just have to do:
```javascript
const group = require("./group");

group.one();
group.two();
```


This helps in keeping your project structure organized, by creating smaller modules, and also reducing the amount of *require* statements in your main modules.

This approach is often used in web applications to put, for example, all the controllers together and load them in one go.

The example [e07-hello-require-module-groups-package](../e07-hello-require-module-groups-package) illustrates an alternative approach for the same scenario using a `package.json`.
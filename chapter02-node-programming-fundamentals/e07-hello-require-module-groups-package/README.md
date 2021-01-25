# e07-hello-require-module-groups-package
> grouping related files together under a directory and loading them in one single `require` in a more flexible way using a `package.json` for the module.

## Description
The example illustrates how you can group several modules in a single directory, then provide a module that just requires what's exported in those modules and acts as a façade to be able to load all of them in one go.
From the main program, you just have to *require* the name of the directory that holds them to have access to everything that is *exported* in that directory.

By using a `package.json`, the module that acts as a façade can be called whatever you want:

```json
{
  "name": "group",
  "main": "./group.js"
}
```

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

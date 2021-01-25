# 03-hello-vows
> introducing *Vows* testing framework

## Description
*Vows* is another BDD testing framework especially created for *Node.js*.  

To configure your project for *Vows* you just have to add it as a development dependency, and tweak a little bit your `package.json`:

```javascript
...
  "devDependencies": {
    ...
    "vows": "0.8.1"
  },
  "dependencies": {},
  "scripts": {
  ...
    "test": "node_modules/.bin/vows app/tst/*.js",
    "test-debug": "node_modules/.bin/mocha app/tst/*.js --inspect-brk=${npm_config_debugHost:-127.0.0.1}"
  }
```

The best way to see how *Vows* tests are structured is to see it in an example, like the one below:

```javascript
const vows = require("vows");
const assert = require("assert");
const Todo = require("../src/lib/todo");

vows.describe("Todo").addBatch({
  "when adding an item": {
    topic: () => {
      const todo = new Todo();
      todo.add("Wash my car");
      return todo;
    },
    "it should exist in my todos": (err, todo) => {
      assert.equal(todo.length, 1);
    }
  }
}).export(module);
```

Note that:
+ `vows` is *required* in the test code.
+ You start by defining a test suite (*Todo*), and then add *batches* to it.
+ Each batch contains topics in which you test specific functionality of your module.


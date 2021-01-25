"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

function wrapObject(original, prefix = "_") {
  function invariant(key, action) {
    if (key.startsWith(prefix)) {
      throw new Error(`Invalid attempt to ${ action } private "${ key }" property`);
    }
  }
  const handler = {
    get(original, key) {
      invariant(key, "get");
      return Reflect.get(original, key);
    },
    set(original, key, value) {
      invariant(key, "set");
      return Reflect.set(original, key, value);
    }
  };
  return new Proxy(original, handler);   
}

const target = {
  _hidden: "can't be read or written to",
  text: "initial value"
};

const proxy = wrapObject(target);

console.log(`(before): proxy.text=${ proxy.text }`);
proxy.text = "Hello to Jason Isaacs!";
console.log(`(after ): proxy.text=${ proxy.text }`);

try {
  proxy._hidden = "secret";
} catch (e) {
  console.log(`Error writing property: ${ e }`);
}

try {
  console.log(proxy._hidden);
} catch (e) {
  console.log(`Error reading property: ${ e }`);
}
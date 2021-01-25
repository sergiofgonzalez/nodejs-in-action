"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/* simplest example */
const numbers = [1, 2, 3, 4, 5];
const names = ["uno", "dos", "tres", "catorce"];

const namesAndNumbers = { numbers, names };

console.log(`namesAndNumbers=${util.inspect(namesAndNumbers)}`);

/* reimplemening localstore API */
var store = {};
var localStoreApi = { getItem, setItem, clear};

function getItem(key) {
  return key in store ? store[key] : null;
}

function setItem(key, value) {
  store[key] = value;
}

function clear() {
  store = {};
}

localStoreApi.clear();
localStoreApi.setItem("one", 1);
localStoreApi.setItem("two", 2);

console.log(`one=${localStoreApi.getItem("one")}`);
console.log(`three=${localStoreApi.getItem("three")}`);
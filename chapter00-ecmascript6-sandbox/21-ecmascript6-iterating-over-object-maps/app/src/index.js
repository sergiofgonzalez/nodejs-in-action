"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/*
  Hello Map of colors!
*/
const colors = {
  green: "#0e0",
  orange: "#f50",
  pink: "#e07"
};

/* old-style iteration */
for (let key in colors) {
  console.log(`${ key }: ${ colors[key] }`);
}

/* ES6-style iteration */

const iterableColors = {
  green: "#0e0",
  orange: "#f50",
  pink: "#e07",
  [Symbol.iterator]() {
    const keys = Object.keys(colors);
    return {
      next() {
        const done = keys.length === 0;
        const key = keys.shift();
        return {
          done,
          value: [key, colors[key]]
        };
      }
    };
  }
};

const colorItems = [...iterableColors];
colorItems.forEach(color => console.log(color));

/* polluting the colors map with iterator is ugly, but it can be improved */
function keyValueIterable(target) {
  target[Symbol.iterator] = function () {
    const keys = Object.keys(target);
    return {
      next() {
        const done = keys.length === 0;
        const key = keys.shift();
        return {
          done,
          value: [key, target[key]]
        };
      }
    };
  };
  return target;
}

const wrappedColors = keyValueIterable(colors);

/* iterating over the values */
for (let [, color] of wrappedColors) {
  console.log(color);
}


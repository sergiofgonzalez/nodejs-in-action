"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;


/* case 1: reading from array and creating individual properties */
const coordinates = [12, 5];
const [x, y] = coordinates;

console.log(`x=${x}; y=${y}`);

/* case 2: skipping uninteresting properties */
const me = ["Sergio", "F.", "Gonzalez"];
const [firstName, , lastName] = me;
console.log(`firstName=${firstName}; lastName=${lastName}`);

/* case 3: assigning default values for undefined properties */
const car = ["VW", "Golf GTI"];
const [make, model, power = "n/a"] = car;
console.log(`make=${make}; model=${model}; power=${power}`);

/* now we can use this trick for swapping */
var a = 5;
var b = 8;
[a, b] = [b, a];
console.log(`a=${a}; b=${b}`);

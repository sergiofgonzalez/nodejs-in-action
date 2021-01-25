

const util = require("util");
let exchange = require("./lib/exchange");

util.inspect.defaultOptions.depth = null;

console.log(`${ exchange }`);

exchange = "hello to wittertainment";
console.log(`${ exchange }`);

setTimeout(() => exchange = "hello to Jason Isaacs", 5000);

setInterval(() => console.log(exchange), 1000);

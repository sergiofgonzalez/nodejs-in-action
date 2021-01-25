"use strict";
const { Readable } = require("stream");

const src = new Readable();

src.push("Hello");
console.log("push!");

src.push("to");
console.log("push!");

src.push("Jason");
console.log("push!");

src.push("Isaacs");
console.log("push!");

src.push("\n");
console.log("push!");

src.push(null);
console.log("push!");

src.pipe(process.stdout);

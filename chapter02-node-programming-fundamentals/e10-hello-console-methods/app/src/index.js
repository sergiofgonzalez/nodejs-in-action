"use strict";

/* measuring performance (start) */
console.time("app");

/* levels */
console.log(`This is a log message`);
console.debug(`This is a debug message`);
console.info(`This is an info message`);
console.error(`This is an error message`);
console.warn(`This is a warning message`);

/* formats */
const name = "Jason Isaacs";
const obj = { name: "Idris Elba" };
const favoriteNum = 5;
console.log("Hello %s!", name);
console.log("Hello", name);
console.log("Hello", obj);
console.log("Hello %j!", obj);
console.log("My favorite number is %d and yours?", favoriteNum);

/* showing the stack trace */
console.trace();


/* measuring performance (end) */
console.timeEnd("app");

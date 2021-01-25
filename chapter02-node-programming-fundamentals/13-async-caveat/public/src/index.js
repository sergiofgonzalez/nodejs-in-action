"use strict";

function asyncFunction(callback) {
  setTimeout(callback, 0);
}


let color = `blue`;
asyncFunction(() => console.log(`color=${color}`));   // we would expect blue, but it's actually green

color = `green`;
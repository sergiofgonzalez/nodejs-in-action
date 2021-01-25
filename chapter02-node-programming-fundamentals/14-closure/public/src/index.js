"use strict";

function asyncFunction(callback) {
  setTimeout(callback, 0);
}

let color = `blue`;
(color => {
  asyncFunction(() => console.log(`color=${color}`));
})(color);
color = `green`;
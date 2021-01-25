"use strict";

/* `let` is like var but with a limited scope */
for (var i = 0; i < 10; i++) {
  // do nothing
}
console.log("var i:", i);

for (let j = 0; j < 10; j++) {
  // do nothing
}
// Remove comments to verify that j is not defined
//console.log("let j:", j); // eslint-disable-line no-undef

const num = 5;
console.log(num);
// Remove comments to verify that num value cannot be
//console.log("num=" + num + ", num++=", num++); // eslint-disable-line no-const-assign

const obj = {name: "sergio"};
console.log(obj);

// This is ok as const means => do not change object reference, but you can change contents
obj.name = "Sergio";
console.log(obj);

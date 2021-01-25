"use strict";

var name = "Sergio";
console.log(`My name is ${name}`);

var user = { name: "Sergio" };
console.log(`My username is ${user.name}`);

var htmlBody = `
<body>
  <div class='container'>
    <h1>Hello, ${user.name}</h1>
  </div>
</body>
`;

console.log(htmlBody);

// nesting template literals
const one = "one";
const nested = `This is a template literal ${ `with another ${ one }`} embedded inside it`;
console.log(nested);

// tagged template: using String.raw to prevent interpreting escape sequences
const text = String.raw`The \n in the string won't be interpreted as a newline`;
console.log(text);
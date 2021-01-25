'use strict';

function displayPath() {
  process.env.PATH.split(':').forEach(path => {
    console.log(path);
  });
}

console.log('=== BEFORE: ');
displayPath();

process.env.PATH += ':~/Development';

console.log('=== AFTER: ');
displayPath();

/* this variable did not exist and will not exist once the program is done */
process.env.MY_VAR = `Hello, world!`;
console.log(`MY_VAR=${ process.env.MY_VAR }`);

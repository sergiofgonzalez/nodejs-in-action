'use strict';

const findUserById = require('./lib/find-user-by-id');

findUserById(5, (err, data) => {
  if (err) {
    console.log(`ERROR: ${ err }`);
    return;
  }
  console.log(`id: 5 => user: ${ data.name }, email: ${ data.email }`);
});

findUserById(111, (err, data) => {
  if (err) {
    console.log(`ERROR: ${ err }`);
    return;
  }
  console.log(`id: 5 => user: ${ data.name }, email: ${ data.email }`);
});


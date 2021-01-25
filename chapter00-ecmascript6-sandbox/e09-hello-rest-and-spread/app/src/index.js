'use strict';

const util = require('util');
util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

/* getUser is a function that takes an object containing either a userId or username property */
function getUser(params) {
  const { userid, username, ...args } = params;

  if (typeof userid !== 'undefined') {
    return getUserById(userid, args);
  }

  if (typeof username !== 'undefined') {
    return getUserByUsername(username, args);
  }

  throw new Error('either userId or username needs to be passed');
}

function getUserById(userId, args) {
  console.log(`getting User by id: ${ userId }; ${ util.inspect(args) }`);
}

function getUserByUsername(username, args) {
  console.log(`getting User by username: ${ username }; ${ util.inspect(args) }`);
}

getUser({ username: 'sergio.f.gonzalez ', age: 45, role: 'developer' });
getUser({ userid: 'uscda09 ', additionalData: { system: 'z/OS', environment: 'dev', role: 'CEDA SysAdmin' } });

/* spread operator for merging objects */
function mergeObjects(obj1, obj2, obj3) {
  return { ...obj1, ...obj2, ...obj3};
}

console.log(mergeObjects({ name: 'Jason Isaacs'}, { favoriteGreeting: 'Hello!' }, { hobbies: ['tweeter', 'acting' ], profession: 'actor' }));

/* another use case is to add properties into an existing object */
function addEmailToUser(email, user) {
  return { email, ...user };
}

console.log(addEmailToUser('sergio.f.gonzalez@gmail.com', { username: 'sergio.f.gonzalez', role: 'developer' }));

/* array concatenation and destructuring */
const strings = ['hello', 'to', 'Jason', 'Isaacs'];
const [first, ...rest] = strings;
console.log(`first=${ first }; rest=${ rest }`);

const trailer = ['from', 'your', 'friends'];
const result = [...strings, '!!', ...trailer];
console.log(result);
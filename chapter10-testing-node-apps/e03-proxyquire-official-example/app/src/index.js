'use strict';

const fileAllCaps = require('./lib/file-all-caps');

console.log(`basenameAllCaps: ${ fileAllCaps.basenameAllCaps('readme.md') }`);
console.log(`extnameAllCaps: ${ fileAllCaps.extnameAllCaps('readme.md') }`);


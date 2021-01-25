const path = require('path');

function extnameAllCaps(file) {
  return path.extname(file).toUpperCase();
}

function basenameAllCaps(file) {
  return path.basename(file).toUpperCase();
}

module.exports = {
  extnameAllCaps,
  basenameAllCaps
};
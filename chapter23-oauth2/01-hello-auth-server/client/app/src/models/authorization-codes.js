const codes = {};

function addAuthorizationCode({ code, authInfo }) {
  codes[code] = authInfo;
}

function findAuthorizationCode(code) {
  return codes[code];
}

function deleteAuthorizationCode(code) {
  delete codes[code];
}


module.exports = {
  addAuthorizationCode,
  findAuthorizationCode,
  deleteAuthorizationCode
};
const requests = {};

function addAuthorizationRequest({ requestId, requestQuery }) {
  requests[requestId] = requestQuery;
}

function findAuthorizationRequestById(requestId) {
  return requests[requestId];
}

function deleteAuthorizationRequestById(requestId) {
  delete requests[requestId];
}


module.exports = {
  addAuthorizationRequest,
  findAuthorizationRequestById,
  deleteAuthorizationRequestById
};
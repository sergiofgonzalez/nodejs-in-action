'use strict';

const Client = require('../models/client');
const AuthorizationServer = require('../models/authorization-server');
const { addAuthorizationRequest, findAuthorizationRequestById, deleteAuthorizationRequestById } = require('../models/authorization-requests');
const { addAuthorizationCode, findAuthorizationCode, deleteAuthorizationCode } = require('../models/authorization-codes');

function getAuthorizationServer() {
  return AuthorizationServer.getAuthorizationServer();
}

function getClients() {
  return Client.getClients();
}

function getClientByClientId(clientId) {
  return Client.findByClientId(clientId);
}

function addNewAuthorizationRequest({ reqId, reqQuery }) {
  addAuthorizationRequest({ requestId: reqId, requestQuery: reqQuery });
}

function getAuthorizationRequestById(reqId) {
  return findAuthorizationRequestById(reqId);
}

function removeAuthorizationRequestById(reqId) {
  deleteAuthorizationRequestById(reqId);
}

function addNewAuthorizationCode({ code, authInfo }) {
  addAuthorizationCode({ code, authInfo });
}

function getAuthorizationCode(code) {
  return findAuthorizationCode(code);
}

function removeAuthorizationCode(code) {
  deleteAuthorizationCode(code);
}

module.exports = {
  getAuthorizationServer,
  getClients,
  getClientByClientId,
  addNewAuthorizationRequest,
  getAuthorizationRequestById,
  removeAuthorizationRequestById,
  addNewAuthorizationCode,
  getAuthorizationCode,
  removeAuthorizationCode
};

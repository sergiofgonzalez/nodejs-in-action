"use strict";

async function getAuthHeader(user, password) {  
  const authString = `${ user }:${ password }`;
  const base64AuthString = new Buffer(authString).toString("base64");
  return `Authorization: ${ base64AuthString }`;
}

async function getCredentials(authHeader) {
  if (!authHeader) {
    throw new Error("Cannot get credentials from non-existing authHeader");
  }
  const regex = /^Authorization:\s+(\w+)$/i;

  const found = authHeader.match(regex);
  if (!found) {
    throw new Error("Could not make sense of given auth header");
  }
  const base64AuthString = found[1];
  const authString = new Buffer(base64AuthString, "base64").toString("utf8");

  const credentials = authString.split(":");
  return {
    user: credentials[0],
    password: credentials[1]
  };
}

exports.getAuthHeader = getAuthHeader;
exports.getCredentials = getCredentials;

"use strict";

const basicAuth = require("./lib/basic-auth");


async function getAuthFromCredentials() {
  try {
    const authHeader = await basicAuth.getAuthHeader("sergio.f.gonzalez", "daleksLuv");
    console.log(authHeader);
  } catch (err) {
    console.log("Error getting auth header from credentials:", err.message);
    process.exit(1);
  }
}

async function getCredentialsFromAuthHeader() {
  try {
    const credentials = await basicAuth.getCredentials("Authorization: c2VyZ2lvLmYuZ29uemFsZXo6ZGFsZWtzTHV2");
    console.log(credentials);
  } catch (err) {
    console.log("Error getting auth header from credentials:", err.message);
    process.exit(1);
  }
}

getAuthFromCredentials();
getCredentialsFromAuthHeader();
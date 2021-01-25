"use strict";

const username = "sergio.f.gonzalez";
const password = "daleksLuv";

const plainTextAuthString = `${ username }:${ password }`;
const buf = new Buffer(plainTextAuthString, "utf8");

const base64EncodedAuthString = buf.toString("base64");
const basicAuthHeader = `Authorization: ${ base64EncodedAuthString }`;

console.log(basicAuthHeader);

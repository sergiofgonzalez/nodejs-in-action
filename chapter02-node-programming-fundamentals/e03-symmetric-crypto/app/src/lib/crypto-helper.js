"use strict";

const crypto = require("crypto"); // see openssl list-cipher-algorithms for list of supported algos
 
const util = require("util");
util.inspect.defaultOptions.depth = null;

module.exports.encrypt = (clearText) => {
  const cipher = crypto.createCipher("AES256", "wittertainment");
  let encrypted = cipher.update(clearText, "utf8", "hex");
  encrypted += cipher.final("hex");
  return Promise.resolve(encrypted);
};

module.exports.decrypt = (encryptedHash) => {
  const decipher = crypto.createDecipher("AES256", "wittertainment");  
  let clearText = decipher.update(encryptedHash, "hex", "utf8");
  clearText += decipher.final("utf8");
  return Promise.resolve(clearText);
};

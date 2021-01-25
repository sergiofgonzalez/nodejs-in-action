"use strict";

const cryptoHelper = require("./lib/crypto-helper");


(async function testSymmetric() {
  const clearText = "Hello to Jason Isaacs!";
  const encryptedHash = await cryptoHelper.encrypt(clearText);
  const decryptedText = await cryptoHelper.decrypt(encryptedHash);
  console.log(`-- async-await
    clearText="${ clearText }"
    encrypted="${ encryptedHash }"
    decrypted="${ decryptedText }"
  `);
})();


/* plain promises */
const clearText = "Hello to Jason Isaacs!";

let pEncryptedHash, pDecryptedText;
cryptoHelper
  .encrypt(clearText)
  .then(result => {
    pEncryptedHash = result;
    console.log(`encryptedHash=${ pEncryptedHash }`);
    return result;
  })
  .then(result => cryptoHelper.decrypt(result))
  .then(result => {
    pDecryptedText = result;
    console.log(`-- plain Promises
      clearText="${ clearText }"
      encrypted="${ pEncryptedHash }"
      decrypted="${ pDecryptedText }"
    `);
  });

/* eslint-disable no-unused-vars */

function delayError(millis) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`Error after ${ millis } ms`)), millis);
  });
}


async function errorNotCaught() {
  try {
    return delayError(1000);
  } catch (err) {
    console.error(`ERROR: caught by the async function: ${ err.message }`);
  }
}

async function errorCaught() {
  try {
    return await delayError(1000);
  } catch (err) {
    console.error(`ERROR: caught by the async function: ${ err.message }`);
  }
}


// errorNotCaught()
//   .catch(err => console.error(`ERROR: caught by the caller: ${ err.message }`));

errorCaught()
  .catch(err => console.error(`ERROR: caught by the caller: ${ err.message }`));
/* eslint-disable no-unused-vars */
export function createTimestampedConsole(console) {
  /* Explicit monkey-patched */
  console.log = getTimestampedFunction(console.log);
  console.error = getTimestampedFunction(console.error);
  console.debug = getTimestampedFunction(console.debug);
  console.info = getTimestampedFunction(console.info);

  /* Alternatively, we could have done */
  // ['log', 'error', 'debug', 'info']
  //   .forEach((funcName) => {
  //     console[funcName] = getTimestampedFunction(console[funcName]);
  //   });


  return console;
}


function getTimestampedFunction(fn) {
  return (...args) => fn(new Date().toISOString(), ...args);
}
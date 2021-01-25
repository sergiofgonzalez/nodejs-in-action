require('./logger').customMessage = function () {
  console.log(`this is new functionality patched into an existing module`);
};

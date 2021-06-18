
/* Hello, callbacks! */
function delayExecutionWithCallback(cb: () => void) {
  function executeCallback() {
    console.log(`5: executeCallback()`);
    cb();
  }
  console.log(`2: calling setTimeout()`);
  setTimeout(executeCallback, 1000);
  console.log(`3: after calling setTimeout()`);
}

function callDelayedAndWait() {
  function afterWait() {
    console.log(`6: afterWait()`);
  }
  console.log(`1: calling delayExecutionWithCallback()`);
  delayExecutionWithCallback(afterWait);
  console.log(`4: after calling delayExecutionWithCallback()`);
}

callDelayedAndWait();

/*
  Expected:
    + 1
    + 2
    + 3
    + 4
    + 5
    + 6
*/
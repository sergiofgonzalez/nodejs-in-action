"use strict";

function monitorMemory() {
  console.log(process.memoryUsage());
}

const monitorHandle = setInterval(monitorMemory, 1000);
monitorHandle.unref(); // Tell Node.js to exit without having to clear that timer

setTimeout(console.log.bind(this, "Done"), 10000);
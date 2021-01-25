/* eslint-disable no-unused-vars */

function delay(millis) {
  return new Promise(resolve => {
    setTimeout(() => resolve(new Date()), millis);
  });
}


function leakingLoop() {
  return delay(1)
    .then(() => {
      console.log(`Tick ${ Date.now() }`);
      return leakingLoop();
    });
}

function nonLeakingLoop() {
  return delay(1)
    .then(() => {
      console.log(`Tick ${ Date.now() }`);
      nonLeakingLoop();
    });
}

setTimeout(() => {
  console.log(`Sending SIGINT signal after 10 seconds`);
  process.kill(process.pid, 'SIGINT');
}, 60* 1000);



for (let i = 0; i < 10; i++) {
  leakingLoop();
  // nonLeakingLoop();
}

'use strict';

const failTurn = getRandomIntBetweenInclusive(0, 9);

process.on(`message`, async job => {
  const numSecondsToWait = getRandomIntBetweenInclusive(10, 30);
  console.log(`WORKER: About to process job ${ job } (failturn: ${ failTurn }, waitTime= ${ numSecondsToWait } seconds)`);
  await sleep(numSecondsToWait);
  if (failTurn === 5) {
    console.log(`WORKER: simulating exception: job=${ job }`);
    throw new Error(`Fabricated error simulated on the worker`);
  }
  console.log(`WORKER: job ${ job }  done!`);
  process.send(`finished job ${ job }: waited for ${ numSecondsToWait } seconds`);
});


function getRandomIntBetweenInclusive(minInt, maxInt) {
  const min = Math.ceil(minInt);
  const max = Math.floor(maxInt);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function sleep(numSeconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, numSeconds * 1000);
  });
}


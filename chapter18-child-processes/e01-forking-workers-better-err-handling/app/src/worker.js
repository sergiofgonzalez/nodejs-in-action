'use strict';
// const util = require('util');

const willFail = getRandomIntBetweenInclusive(0, 9) < 5;

process.on(`message`, async job => {
  const numSecondsToWait = getRandomIntBetweenInclusive(5, 15);
  console.log(`WORKER[${ job }]: About to process job ${ job } (willFail: ${ willFail }, waitTime= ${ numSecondsToWait } seconds)`);
  await sleep(numSecondsToWait);
  if (willFail) {
    console.log(`WORKER[${ job }]: simulating exception: job=${ job }`);
    return process.send({err: 'An error occurred' });    
  }
  console.log(`WORKER[${ job }]: sending successfully finished message`);
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


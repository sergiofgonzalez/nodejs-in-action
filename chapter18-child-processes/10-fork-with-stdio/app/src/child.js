'use strict';

process.on('message', msg => {
  if (msg === 'quit') {
    console.log(`received quit signal!`);
    process.send(`quit`);
  } else {
    process.send(`received: "${ msg }"`);
  }
});
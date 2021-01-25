'use strict';

const child_process = require('child_process');
const path = require('path');

/* fork: Node process, evented, without subshell */

const child = child_process.fork(path.join(__dirname, 'child.js'));
child.on('message', message => {
  console.log(`child says: "${ message }"`);
  if (message === 'quit') {
    child.disconnect();
  }
});

child.send(230);
child.send('Hello to Jason Isaacs!');
child.send({ name: 'Sergio', status: 'unknown' });
child.send('quit');

'use strict';

const child_process = require('child_process');
const path = require('path');
const { Writable } = require('stream');



/* fork: Node process, evented, without subshell */

const child = child_process.fork(path.join(__dirname, 'child.js'), { silent: true });
child.on('message', message => {
  console.log(`child says: "${ message }"`);
  if (message === 'quit') {
    child.disconnect();
  }
});


class MyWritableStream extends Writable {
  constructor(marker) {
    super();
    this.marker = marker;
  }

  _write(chunk, enc, next) {
    console.log(`${ this.marker }(${ enc }): ${ chunk }`);
    next();
  }
}

const stdoutStream = new MyWritableStream('stdout-child');
child.stdout.pipe(stdoutStream);

child.send(230);
child.send('Hello to Jason Isaacs!');
child.send({ name: 'Sergio', status: 'unknown' });
child.send('quit');

'use strict';

const child_process = require('child_process');
const { Writable } = require('stream');

/* spawn: non-Node, evented, without subshell */

/* spawn child process and pipe child process out/err to stdout/stderr */
/* note that $TERM is not evaluated as we're without subshell here */
const childProcess = child_process.spawn('echo', ['hello', 'world', '$TERM']);
childProcess.on('error', console.error);
childProcess.stdout.pipe(process.stdout);
childProcess.stderr.pipe(process.stderr);



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

const stdoutStream = new MyWritableStream('stdout');
const stderrStream = new MyWritableStream('stderr');

const childProcess2 = child_process.spawn('ls', ['-la', '/']);
childProcess2.on('error', console.error);
childProcess2.stdout.pipe(stdoutStream);
childProcess2.stderr.pipe(stderrStream);
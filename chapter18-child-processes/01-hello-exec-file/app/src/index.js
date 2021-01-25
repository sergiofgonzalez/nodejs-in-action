'use strict';

const child_process = require('child_process');
const { promisify } = require('util');
const execFile = promisify(child_process.execFile);

/* execFile: non-Node, buffered output, without subshell */

/* simple: note that $TERM is not evaluated as we're without subshell here */
child_process.execFile('echo', ['hello', 'world', '$TERM'], (err, stdout, stderr) => {
  if (err) {
    return console.error(`Error executing command: message=${ err.message }, code=${ err.code }`);
  }
  console.log('execFile: successful execution');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});


/* error handling: ENOENT - not found */
child_process.execFile('hecho', ['hello', 'world', '$TERM'], (err, stdout, stderr) => {
  if (err) {
    return console.error(`Error executing command: message=${ err.message }, code=${ err.code }`);
  }
  console.log('execFile: successful execution');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});


/* error handling: Command failed - not found */
child_process.execFile('cat', ['non-existing'], (err, stdout, stderr) => {
  if (err) {
    return console.error(`Error executing command: message=${ err.message }, code=${ err.code }`);
  }
  console.log('execFile: successful execution');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});

/* error handling: Command failed - not found */
child_process.execFile('git', ['flushy'], (err, stdout, stderr) => {
  if (err) {
    return console.error(`Error executing command: message=${ err.message }, code=${ err.code }`);
  }
  console.log('execFile: successful execution');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});

/* using promises instead of callbacks */
(async () => {
  try {
    const {stdout, stderr} = await execFile('node', ['--version']);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (err) {
    console.error(`Error executing command: message=${ err.message }, code=${ err.code }`);
  }
 
  try {
    const {stdout, stderr} = await execFile('git', ['--hello-to-jason-isaacs']);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (err) {
    console.error(`Error executing command: message=${ err.message }, code=${ err.code }`);
  }
})();

'use strict';

const child_process = require('child_process');
const path = require('path');
const util = require('util');
const execAsync = util.promisify(child_process.exec);

/* exec: non-Node, buffered, with a subshell */

/* as we have a shell in place we can use $TERM */
child_process.exec('echo hello world $TERM', (err, stdout, stderr) => {
  if (err) {
    console.log('Could not execute command:', err.message);
    return;    
  }
  console.log('STDOUT:', stdout);
  console.log('STDERR:', stderr);
});

/* and run pipes natively */
child_process.exec(`cat ${ path.join(__dirname, 'data', 'words.txt') } | sort | uniq`, (err, stdout, stderr) => {
  if (err) {
    console.log('Could not execute command:', err.message);
    return;    
  }
  console.log('STDOUT:', stdout);
  console.log('STDERR:', stderr);
});

/* using async/await */
(async () => {
  const {stdout, stderr} = await execAsync(`cat ${ path.join(__dirname, 'data', 'words.txt') } | sort | uniq`);
  console.log('STDOUT(async):', stdout);
  console.log('STDERR(async):', stderr); 
})();



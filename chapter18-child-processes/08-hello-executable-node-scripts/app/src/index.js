'use strict';

const child_process = require('child_process');
const { promisify } = require('util');
const execFileAsync = promisify(child_process.execFile);
const path = require('path');


/* execFile: non-Node (well, it's a Node.js shell script), buffered output, without subshell */

(async () => {
  console.log(`Executing long-running.sh on detached mode!`);
  const { stdout, stderr } = await execFileAsync(path.join(__dirname, 'bin', 'greet'), ['Jason Isaacs']);
  
  console.log(`Script returned: ${ stdout }, err=${ stderr }`);  
})();

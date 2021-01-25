'use strict';

const child_process = require('child_process');
const path = require('path');


/* spawn: non-Node, streaming/eventd, detached, without a subshell */


console.log(`Executing long-running.sh on detached mode!`);
const child = child_process.spawn(path.join(__dirname, 'scripts', 'long-running.sh'), [], 
  { 
    detached: true,
    stdio: ['ignore', 'ignore', 'ignore']
  });

child.unref();
console.log(`-- done!`);


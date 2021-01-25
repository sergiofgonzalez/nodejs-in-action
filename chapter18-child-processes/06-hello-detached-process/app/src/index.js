'use strict';

const child_process = require('child_process');
const path = require('path');



/* spawn: non-Node, streaming/eventd, detached, without a subshell */


(async () => {
  try {
    const child = child_process.spawn(path.join(__dirname, 'scripts', 'long-running.sh'), [], { detached: true });
    child.on('error', (err) => {
      console.log(`Child process reported an error: ${ err.message }, code= ${ err.code }`);
    });
  } catch (err) {
    console.error(`Application error:`, err);
  }

})();


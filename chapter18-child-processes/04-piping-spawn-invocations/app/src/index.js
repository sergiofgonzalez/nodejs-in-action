'use strict';

const child_process = require('child_process');
const path = require('path');


/* programmatic equivalent to cat ./data/words.txt | sort | uniq */
const catChildProcess = child_process.spawn('cat', [path.join(__dirname, 'data', 'words.txt')]);
const sortChildProcess = child_process.spawn('sort');
const uniqChildProcess = child_process.spawn('uniq');

catChildProcess.stdout.pipe(sortChildProcess.stdin);
sortChildProcess.stdout.pipe(uniqChildProcess.stdin);
uniqChildProcess.stdout.pipe(process.stdout);
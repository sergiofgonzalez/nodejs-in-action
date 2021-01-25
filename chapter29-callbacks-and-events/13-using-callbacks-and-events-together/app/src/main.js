import glob from 'glob';

glob('./**/*.md', (err, files) => {
  if (err) {
    console.error(`ERROR: glob cb: could not complete globbing: ${ err.message }`);
    process.exit(1);    
  }
  console.log(`The following files were found: ${ files }`);
}).on('match', match => console.log(`glob (match event): ${ match }`));

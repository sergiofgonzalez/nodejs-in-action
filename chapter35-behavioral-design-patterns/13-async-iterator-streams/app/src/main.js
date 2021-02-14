import split from 'split2';

async function main() {
  console.log(`Type lines in 'stdin', every line will be emitted as a chunk, CTRL+D to end`);
  const stream = process.stdin.pipe(split());

  for await (const line of stream) {
    console.log(`STREAM: ${ line }`);
  }
}


main()
  .then(() => console.log(`done!`))
  .catch(err => console.error(`ERROR: ${ err.message }`));
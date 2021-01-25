
if (process.stdin.isTTY) {
  console.log(`Type characters, use \u001b[1m\u001b[92m'ENTER'\u001b[0m to make chunk available, \u001b[1m\u001b[92m'CTRL+D'\u001b[0m to send EOF and terminate`);
}

process.stdin
  .on('readable', () => {
    let chunk;
    console.log(`INFO: new data available`);
    while ((chunk = process.stdin.read()) !== null) {
      console.log(`INFO: chunk read (${ chunk.length } bytes): '${ chunk.toString() }'`);
    }
  })
  .on('end', () => console.log('INFO: end of stream'));

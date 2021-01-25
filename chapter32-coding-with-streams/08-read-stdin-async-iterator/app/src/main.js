
if (process.stdin.isTTY) {
  console.log(`Type characters, use \u001b[1m\u001b[92m'ENTER'\u001b[0m to make chunk available, \u001b[1m\u001b[92m'CTRL+D'\u001b[0m to send EOF and terminate`);
}

async function main() {
  for await (const chunk of process.stdin) {
    console.log(`INFO: new data available`);
    console.log(`INFO: chunk read (${ chunk.length } bytes): '${ chunk.toString() }'`);
  }
  console.log('INFO: end of stream');
}

main()
  .then(() => console.log(`processing of readable stream completed`));

import { concatFiles } from './lib/concat-files.js';

async function main() {
  try {
    await concatFiles(process.argv[2], process.argv.slice(3));
  } catch (err) {
    console.error(`ERROR: ${ err.message }`);
    process.exit(1);
  }

  console.log(`INFO: successfully concatenated files!`);
}


main()
  .then(() => console.log(`INFO: done!`));

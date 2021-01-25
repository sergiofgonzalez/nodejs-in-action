import { spider } from './lib/spider.js';


const url = process.argv[2] ?? 'http://www.example.com';
const nesting = Number.parseInt(process.argv[3], 10) || 1;


spider(url, nesting, err => {
  if (err) {
    console.error(`ERROR: main: ${ err.message }`);
    process.exit(1);
  }

  console.log(`INFO: ${ url } successfully processed!`);
});
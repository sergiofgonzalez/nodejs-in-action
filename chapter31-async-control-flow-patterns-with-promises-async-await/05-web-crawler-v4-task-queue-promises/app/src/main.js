import { spider } from './lib/spider.js';


const url = process.argv[2] ?? 'http://www.example.com';
const nesting = Number.parseInt(process.argv[3], 10) || 1;
const concurrency = Number.parseInt(process.argv[4], 10) || 2;


spider(url, nesting, concurrency)
  .then(() => console.log(`INFO: ${ url } successfully processed!`))
  .catch(err => console.error(`ERROR: main: ${ err.message }`));

import { spider } from './lib/spider.js';

const url = process.argv[2] ?? 'https://www.imdb.com/title/tt0049096';
const nesting = Number.parseInt(process.argv[3] ?? 1, 10);
const concurrency = Number.parseInt(process.argv[4] ?? 2, 10);

spider(url, nesting, concurrency)
  .then(() => console.log(`Download of ${ url } complete`))
  .catch(err => console.error(`ERROR downloading ${ url }: ${ err.message }`));
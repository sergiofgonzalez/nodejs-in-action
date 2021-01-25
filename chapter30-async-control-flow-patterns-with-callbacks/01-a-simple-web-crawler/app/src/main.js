import { spider } from './lib/spider.js';

spider(process.argv[2] ?? 'http://www.example.com', (err, filename, downloaded) => {
  if (err) {
    console.error(`ERROR: main: ${ err.message }`);    
  } else if (downloaded) {
    console.log(`INFO: Completed download of ${ filename }`);
  } else {
    console.log(`INFO: '${ filename } was already downloaded`);
  }
});
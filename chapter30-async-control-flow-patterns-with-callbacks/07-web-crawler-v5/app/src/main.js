import { spider } from './lib/spider.js';
import { TaskQueue } from './lib/task-queue.js';


const url = process.argv[2] ?? 'http://www.example.com';
const nesting = Number.parseInt(process.argv[3], 10) || 1;
const concurrency = Number.parseInt(process.argv[4], 10) || 1;


const spiderQueue = new TaskQueue(concurrency);
spiderQueue.on('error', console.error);
spiderQueue.on('empty', () => console.log(`INFO: completed download of ${ url }`));

spider(url, nesting, spiderQueue);
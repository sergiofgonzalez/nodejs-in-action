import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename, getPageLinks } from './utils.js';
import { promisify } from 'util';
import { TaskQueue } from './TaskQueue.js';

const mkdirpPromises = promisify(mkdirp);


async function download(url, filename) {
  console.log(`Downloading ${ url } into '${ filename }'`);
  const { text: content } = await superagent.get(url);
  await mkdirpPromises(dirname(filename));
  fsPromises.writeFile(filename, content);
  console.log(`INFO: download: ${ filename } from ${ url } downloaded and saved!`);
  return content;
}

function spiderLinks(currentUrl, content, nesting, queue) {
  if (nesting === 0) {
    return Promise.resolve();
  }

  const links = getPageLinks(currentUrl, content);
  const promises = links.map(link => spiderTask(link, nesting - 1, queue));

  return Promise.all(promises);
}

const spidering = new Set();
async function spiderTask(url, nesting, queue) {
  if (spidering.has(url)) {
    return;
  }
  spidering.add(url);

  const filename = urlToFilename(url);
  const content = await queue.runTask(async () => {
    try {
      return await fsPromises.readFile(filename, 'utf-8');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
      return download(url, filename);
    }
  });
  return spiderLinks(url, content, nesting, queue);
}

export function spider(url, nesting, concurrency) {
  const queue = new TaskQueue(concurrency);
  return spiderTask(url, nesting, queue);
}
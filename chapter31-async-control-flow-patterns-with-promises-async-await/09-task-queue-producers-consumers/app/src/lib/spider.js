import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename, getPageLinks } from './utils.js';
import { TaskQueuePC } from './task-queue-pc.js';


async function download(url, filename) {
  console.log(`INFO: downloading ${ url }`);
  const { text: content } = await superagent.get(url);
  await mkdirp(dirname(filename));
  await fsPromises.writeFile(filename, content);
  console.log(`INFO: downloaded and saved: ${ url }`);
  return content;
}

async function spiderLinks(currentUrl, content, nesting, queue) {
  if (nesting === 0) {
    return;
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

      // the file doesn't exist, so let's download it
      return download(url, filename);
    }
  });
  return spiderLinks(url, content, nesting, queue);
}

export async function spider(url, nesting, concurrency) {
  return spiderTask(url, nesting, new TaskQueuePC(concurrency));
}
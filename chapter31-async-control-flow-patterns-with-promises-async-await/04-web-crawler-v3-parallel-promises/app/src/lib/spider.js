import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename, getPageLinks } from './utils.js';
import { promisify } from 'util';

const mkdirpPromises = promisify(mkdirp);

export function spider(url, nesting) {
  const filename = urlToFilename(url);
  return fsPromises.readFile(filename, 'utf8')
    .catch(err => {
      if (err.code !== 'ENOENT') {
        console.error(`ERROR: spider: could not read file ${ filename }: ${ err.message }`);
        throw err;
      }
      return download(url, filename);
    })
    .then(content => spiderLinks(url, content, nesting));
}

function download(url, filename) {
  console.log(`Downloading ${ url } into '${ filename }'`);
  let content;
  return superagent.get(url)
    .then(res => {
      content = res.text;
      return mkdirpPromises(dirname(filename));
    })
    .then(() => fsPromises.writeFile(filename, content))
    .then(() => {
      console.log(`INFO: download: ${ filename } from ${ url } downloaded and saved!`);
      return content;
    });
}

function spiderLinks(currentUrl, content, nesting) {
  if (nesting === 0) {
    return Promise.resolve();
  }

  const links = getPageLinks(currentUrl, content);
  const promises = links.map(link => spider(link, nesting - 1));

  return Promise.all(promises);
}
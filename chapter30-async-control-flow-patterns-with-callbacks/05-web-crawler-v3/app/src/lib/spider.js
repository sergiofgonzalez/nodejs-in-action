import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename, getPageLinks } from './utils.js';

export function spider(url, nesting, cb) {
  const filename = urlToFilename(url);
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        console.error(`ERROR: spider: could not read file ${ filename }: ${ err.message }`);
        return cb(err);
      }

      // ENOENT: file did not previously existed
      return downloadFile(url, filename, (err, requestContent) => {
        if (err) {
          console.error(`ERROR: spider: could not download ${ url } into ${ filename }: ${ err.message }`);
          return cb(err);
        }

        spiderLinks(url, requestContent, nesting, cb);
      });
    }

    // file already existed and was correctly read: process the links
    spiderLinks(url, fileContent, nesting, cb);
  });
}


function spiderLinks(currentUrl, body, nesting, cb) {
  console.log(`INFO: spiderLinks: spidering from ${ currentUrl }`);
  if (nesting === 0) {
    console.log(`INFO: spiderLinks: max nesting reached when processing ${ currentUrl }`);
    // make sure the behavior of the function is always async
    return process.nextTick(cb);
  }

  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) {
    console.log(`INFO: spiderLinks: no links on ${ currentUrl }`);
    return process.nextTick(cb);
  }

  let completed = 0;
  let hasErrors = false;

  function done(err) {
    if (err) {
      console.error(`ERROR: spiderLinks: error found: ${ err.message }`);
      hasErrors = true;
      return cb(err);
    }
    if (++completed == links.length && !hasErrors) {
      return cb();
    }
  }

  links.forEach(link => spider(link, nesting - 1, done));
}


function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), err => {
    if (err) {
      console.error(`ERROR: saveFile: could not create dirs for ${ filename }`);
      return cb(err);
    }
    // write the responde of the HTTP request to the file system
    fs.writeFile(filename, contents, cb);
  });
}

function downloadFile(url, filename, cb) {
  console.log(`Downloading ${ url } into '${ filename }'`);
  superagent.get(url).end((err, res) => {
    if (err) {
      console.error(`ERROR: downloadFile: error accessing ${ url }: ${ err.message }`);
      return cb(err);
    }
    saveFile(filename, res.text, err => {
      if (err) {
        console.error(`ERROR: downloadFile: error saving ${ filename }: ${ err.message }`);
        return cb(err);
      }
      console.log(`INFO: downloadFile: ${ filename } from ${ url } downloaded and saved!`);
      cb(null, res.text);
    });
  });
}
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from './utils.js';

export function spider(url, cb) {
  const filename = urlToFilename(url);
  fs.access(filename, err => {
    if (!err || err?.code !== 'ENOENT') {
      return cb(null, filename, false);
    }
    downloadFile(url, filename, err => {
      if (err) {
        return cb(err);
      }
      cb(null, filename, true);
    });
  });
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
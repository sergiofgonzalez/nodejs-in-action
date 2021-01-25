import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from './utils.js';

export function spider(url, cb) {
  const filename = urlToFilename(url);

  // has filename already been downloaded
  fs.access(filename, err => {
    // ENOENT means file did not previously exist    
    if (err?.code === 'ENOENT') {
      console.log(`Downloading ${ url } into '${ filename }'`);
      superagent.get(url).end((err, res) => {
        if (err) {
          console.error(`ERROR: spider: error accessing ${ url }`);
          cb(err);
        } else {
          // create the dir that will host the file
          mkdirp(path.dirname(filename), err => {
            if (err) {
              console.error(`ERROR: spider: could not create dirs for ${ filename }`);
              cb(err);
            } else {
              // write the responde of the HTTP request to the file system
              fs.writeFile(filename, res.text, err => {
                if (err) {
                  console.error(`ERROR: spider: error writing file ${ filename }`);
                  cb(err);
                } else {
                  cb(null, filename, true);
                }
              });
            }
          });
        }
      });
    } else {
      cb(null, filename, false);
    }
  });
}
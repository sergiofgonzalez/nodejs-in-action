import fs from 'fs';

const originalReadFileFn = fs.readFile;
let mockedResponse = null;

function mockedReadFileFn(path, cb) {
  setImmediate(() => {
    cb(null, mockedResponse);
  });
}

export function mockEnable(respondWith) {
  mockedResponse = respondWith;
  fs.readFile = mockedReadFileFn;
}

export function mockDisable() {
  fs.readFile = originalReadFileFn;
}
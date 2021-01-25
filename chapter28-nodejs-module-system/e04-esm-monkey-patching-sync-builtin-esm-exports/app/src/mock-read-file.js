import fs from 'fs';
import { syncBuiltinESMExports } from 'module';

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
  syncBuiltinESMExports();
}

export function mockDisable() {
  fs.readFile = originalReadFileFn;
  syncBuiltinESMExports();
}
import { resolve } from 'path';

const vfsMap = new Map();


export function createVirtualFSAdapter() {
  return ({
    readFile(filename, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else if (typeof options === 'string') {
        options = { encoding: options };
      }

      if (!vfsMap.has(resolve(filename))) {
        const err = new Error(`ENOENT, open '${ filename }'`);
        err.code = 'ENOENT';
        err.path = filename;
        return callback && callback(err);
      }

      return callback && callback(null, vfsMap.get(resolve(filename)));
    },
    writeFile(filename, contents, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      vfsMap.set(resolve(filename), contents);
      return callback && callback();
    }
  });
}
export function createLoggingWritable(writable) {
  return new Proxy(writable, {
    get(target, propKey) {
      if (propKey === 'write') {
        /*
          we return the function that should be executed instead of
          `writable.write()`
          That function will receive a bunch of args, that's why we
          use `...args`.
        */
        return function (...args) {
          const [ chunk ] = args;
          console.log(`Writing`, chunk);
          return writable.write(...args);
        };
      }
      return target[propKey];
    }
  });
}
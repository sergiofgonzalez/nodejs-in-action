export function createProfiler(target) {
  return new Proxy(target, {
    apply: (target, thisArg, args) => {
      const startTime = process.hrtime.bigint();
      const p = new Promise(resolve => {
        console.log(`invoking ${ target.name?? '(anonymous lambda)' }`);
        resolve(target.call(thisArg, ...args));
      })
        .then((result) => {
          console.log(`${ target.name?? '(anonymous lambda)'} took ${ process.hrtime.bigint() - startTime } nanos`);
          return result;
        });
      return p;
    }
  });
}
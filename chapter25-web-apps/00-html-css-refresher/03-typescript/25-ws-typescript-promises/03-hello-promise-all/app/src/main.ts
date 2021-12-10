function getValue(val: number = 0): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      const result = val + Math.floor(Math.random() * 100);
      console.log(`val was ${ val }, new output is ${ result }`);
      if (result % 10 == 0) {
        reject(`the number ${ result } can be divided by 10!`);
      }
      resolve(result);
    }, 1000);
  });
}

Promise.all([
  getValue(),
  getValue(),
  getValue(),
  getValue(),
  getValue(),
  getValue(),
  getValue(),
  getValue(),
  getValue(),
  getValue()
]).then((promiseAllResult) => {
  console.log(`promiseAllResult:`, promiseAllResult);
  return promiseAllResult;
}).then((results) => {
  const result = results.reduce((acc, val) => acc + val, 0);
  console.log(`grand total:`, result);
}).catch((err) => console.error(`ERROR: ${ err }`))
.finally(() => console.log('Finished!'));

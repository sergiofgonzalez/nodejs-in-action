
/* Consider the following JavaScript code*/
/*
function sleepFor5Seconds() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
}

console.log(new Date().toISOString());
sleepFor5Seconds()
  .then(() => {
    console.log(new Date().toISOString());
  });

The following code is equivalent
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sleepFor5Seconds(): Promise<void> {
  return new Promise<void>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (resolve: () => void, reject: () => void) => {
      setTimeout(() => {
        resolve();
      }, 5000);
  });
}

/* uncomment to execute
console.log(new Date().toISOString());
sleepFor5Seconds()
  .then(() => {
    console.log(new Date().toISOString());
  });
*/

/* returning values from Promises */
function promiseReturningString(throwError: boolean): Promise<string> {
  return new Promise<string>((
    resolve: (outputValue: string) => void,
    reject: (errorCode: number) => void
  ) => {
    if (throwError) {
      reject(101);
    }
    resolve(`resolve with message`);
  });
}

promiseReturningString(true)
  .then((result: string) => {
    console.log(`result:`, result);
  })
  .catch((errCode: number) => {
    console.log(`error:`, errCode);
  });


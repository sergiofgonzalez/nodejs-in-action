
/* Uncomment to run success path
function sleepSeconds(seconds: number): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log(`timeout done!`);
      resolve();
    }, seconds * 1_000);
  });
}

async function run() {
  console.log(new Date().toISOString());
  await sleepSeconds(3);
  console.log(new Date().toISOString());
}

run()
  .then(() => console.log(`done!`));
*/

/* promise that fails with no catch*/
// function failAfterOneSec(): Promise<void> {
//   return new Promise<void>((resolve, reject) => {
//     setTimeout(() => {
//       reject('failed!');
//     }, 1_000);
//   });
// }

// async function fail() {
//   console.log(`before failure`);
//   await failAfterOneSec();
//   console.log(`after failure`);
// }

// fail();

/* promise that fails with catch block */
// function failAfterOneSec(): Promise<void> {
//   return new Promise<void>((resolve, reject) => {
//     setTimeout(() => {
//       reject('failed!');
//     }, 1_000);
//   });
// }

// async function fail() {
//   console.log(`before failure`);
//   try {
//     await failAfterOneSec();
//   } catch (err) {
//     console.error(err);
//   }
//   console.log(`after failure`);
// }

// fail();

/* promise that fails with .catch() */
// function failAfterOneSec(): Promise<void> {
//   return new Promise<void>((resolve, reject) => {
//     setTimeout(() => {
//       reject('failed!');
//     }, 1_000);
//   });
// }

// async function fail() {
//   console.log(`before failure`);
//   await failAfterOneSec();
//   console.log(`after failure`);
// }

// fail()
//   .catch(err => console.error(err));


/* promise that returns values consumed with async/await */
function getValues(): Promise<string[]> {
  return new Promise<string[]>(
    (resolve: (result: string[]) => void) => {
    resolve(['foo', 'bar', 'baz']);
  });
}

async function run() {
  const values = await getValues();
  for (const value of values) {
    console.log(value);
  }
}

run();
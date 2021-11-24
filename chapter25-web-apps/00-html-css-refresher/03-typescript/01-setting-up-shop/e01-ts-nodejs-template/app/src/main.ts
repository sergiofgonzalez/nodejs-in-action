const numbers = ['One', 'Two', 'Three', 'Four', 'Five'];

async function sleep(millis: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, millis);
  });
}

async function count(): Promise<void> {
  for (const number of numbers) {
    await sleep(1_000);
    console.log(number);
  }
}

count()
  .then(() => console.log('done!'));

const p = new Promise<void>((resolve) => {
  setTimeout(() => {
    resolve();
  }, 100);
});

console.log(`${ new Date().toISOString() }: init`);
p.then(() => {
  console.log(`${ new Date().toISOString() }: fulfilled!`);
});

console.log(`${ new Date().toISOString() }: end`);
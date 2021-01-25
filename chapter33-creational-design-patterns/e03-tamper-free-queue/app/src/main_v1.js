import { Queue } from './lib/Queue.js';


async function main() {
  const queue = new Queue((enqueue) => {
    enqueue('one');
    enqueue('two');
    enqueue('three');
    setTimeout(() => {
      enqueue('four');
    }, 2000);
    setTimeout(() => {
      enqueue('five');
    }, 7000);
  });

  for (let i = 0; i < 5; i++) {
    console.log(`${ i }: `, await queue.dequeue());
  }
}

main()
  .then(() => console.log(`INFO: main: done!`))
  .catch((err) => console.error(`ERROR: main: could not complete: ${ err.message }`));

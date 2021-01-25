/* eslint-disable no-unused-vars */
import { promises as fsPromises } from 'fs';
import path from 'path';

/* scenario 1: the classic factorial, now with promises */
// async function factorial(n) {
//   if (n == 1) {
//     return 1;
//   }
//   return n * await factorial(n - 1);
// }


// console.log(`factorial(5)=${ factorial(5) }`);

// factorial(5)
//   .then(result => console.log(`factorial(5)=${ result }`));

/* scenario 2: traversing structures like trees */
// async function visitTreeNodes(rootNode) {
//   const nodes = await fsPromises.readdir(rootNode);
//   for (const node of nodes) {
//     const nodePath = path.join(rootNode, node);
//     const nodeStat = await fsPromises.stat(nodePath);
//     if (nodeStat.isDirectory()) {
//       console.log(`${ nodePath }/: is a directory`);
//       await visitTreeNodes(nodePath);
//     } else {
//       console.log(`${ nodePath }: must be a file`);
//     }
//   }
//   return;
// }

// visitTreeNodes('./sample_dir')
//   .then(() => console.log(`completed visiting './sample_dir'`));


/* scenario 3: traversing structures like trees */
// note that if we leave out `await visitTreeNodes(...)` the visiting
// ends successfully but not in the proper order
// async function visitTreeNodes(rootNode) {
//   const nodes = await fsPromises.readdir(rootNode);
//   for (const node of nodes) {
//     const nodePath = path.join(rootNode, node);
//     const nodeStat = await fsPromises.stat(nodePath);
//     if (nodeStat.isDirectory()) {
//       console.log(`${ nodePath }/: is a directory`);
//       await visitTreeNodes(nodePath);
//     } else {
//       console.log(`${ nodePath }: must be a file`);
//     }
//   }
//   return;
// }

// visitTreeNodes('./sample_dir')
//   .then(() => console.log(`completed visiting './sample_dir'`));

/* Scenario 4: multiple recursive calls */
// async function fibonacci(num) {
//   if (num === 0) {
//     return 0;
//   } else if (num === 1) {
//     return 1;
//   } else {
//     return await fibonacci(num - 1) + await fibonacci(num - 2);
//   }
// }

// for (let i = 0; i < 10; i++) {
//   fibonacci(i).then(console.log);
// }

/* Scenario 5: nested recursive calls */
// async function ackermann(m, n) {
//   if (m === 0) {
//     return n + 1;
//   } else if (n === 0) {
//     return await ackermann(m - 1, 1);
//   } else {
//     return await ackermann(m - 1, await ackermann(m, n - 1));
//   }
// }

// ackermann(3, 4)
//   .then(console.log);

/* Scenario 6: implementing the recursive find in files, but in sequence */
// async function findInFiles(dir, keyword) {
//   const dirEntries = await fsPromises.readdir(dir);
//   for (const dirEntry of dirEntries) {
//     const dirEntryPath = path.join(dir, dirEntry);
//     const dirEntryStat = await fsPromises.stat(dirEntryPath);
//     if (dirEntryStat.isDirectory()) {
//       console.log(`${ dirEntryPath }/: is a directory`);
//       await findInFiles(dirEntryPath, keyword);
//     } else {
//       console.log(`${ dirEntryPath }: must be a file`);
//       const contents = await fsPromises.readFile(dirEntryPath, 'utf8');
//       if (contents.match(keyword)) {
//         console.log(`>> ${ dirEntryPath }: is a hit for ${ keyword }`);
//       }
//     }
//   }
//   return;
// }

// // findInFiles('./sample_dir', 'foo')
// //   .then(() => console.log(`completed scanning './sample_dir'`));

// findInFiles('./sample_dir', 'bar')
//   .then(() => console.log(`completed scanning './sample_dir'`));

/* Scenario 7: implementing the recursive find in files, unlimited parallel */
async function findInFiles(dir, keyword) {
  const promises = [];
  promises.push(fsPromises.readdir(dir)
    .then(async dirEntries => {
      for (const dirEntry of dirEntries) {
        const dirEntryPath = path.join(dir, dirEntry);
        const dirEntryStat = await fsPromises.stat(dirEntryPath);
        if (dirEntryStat.isDirectory()) {
          console.log(`${ dirEntryPath }/: is a directory`);
          await findInFiles(dirEntryPath, keyword);
        } else {
          console.log(`${ dirEntryPath }: must be a file`);
          const contents = await fsPromises.readFile(dirEntryPath, 'utf8');
          if (contents.match(keyword)) {
            console.log(`>> ${ dirEntryPath }: is a hit for ${ keyword }`);
          }
        }
      }
    }));
  await Promise.all(promises);
}

// findInFiles('./sample_dir', 'foo')
//   .then(() => console.log(`completed scanning './sample_dir'`));

findInFiles('./sample_dir', 'bar')
  .then(() => console.log(`completed scanning './sample_dir'`));

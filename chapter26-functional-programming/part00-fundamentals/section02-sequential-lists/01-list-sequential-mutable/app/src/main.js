import { createSequentialList } from './lib/sequential-list.js';

const seqList = createSequentialList();

console.log(seqList.isEmpty());

seqList.insert('one', 0);
seqList.insert('three', 1);
seqList.traverse((item) => {
  console.log(item);
  return item;
});
console.log(`=======================`);

seqList.insert('two', 1);
seqList.traverse((item) => {
  console.log(item);
  return item;
});
console.log(`=======================`);

seqList.insert('zero', 2);
seqList.traverse((item) => {
  console.log(item);
  return item;
});
console.log(`=======================`);

seqList.remove(3);
seqList.traverse((item) => {
  console.log(item);
  return item;
});
console.log(`=======================`);

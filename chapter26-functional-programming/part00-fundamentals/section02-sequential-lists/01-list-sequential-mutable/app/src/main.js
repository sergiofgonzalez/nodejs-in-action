import { createSequentialList } from './lib/sequential-list.js';

const seqList = createSequentialList();

console.log(seqList.isEmpty());

seqList.insert({ item: 'one', pos: 0 });
seqList.insert({ item: 'three', pos: 1 });
seqList.traverse(({ index, item }) => {
  console.log(`${ index }:`, item);
  return item;
});
console.log(`=======================`);

seqList.insert({ item: 'two', pos: 1 });
seqList.traverse(({ item }) => {
  console.log(item);
  return item;
});
console.log(`=======================`);

seqList.insert({ item: 'zero', pos: 2});
seqList.traverse(({ item }) => {
  console.log(item);
  return item;
});
console.log(`=======================`);

seqList.remove(3);
seqList.traverse(({ item }) => {
  console.log(item);
  return item;
});
console.log(`=======================`);

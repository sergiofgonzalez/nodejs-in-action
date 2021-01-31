export function bubbleSort(nums) {
  const sortedNums = [...nums];
  for (let i = 0; i < sortedNums.length - 1; i++) {
    for (let j = sortedNums.length - 1; j >= i + 1; j--) {
      if (sortedNums[j - 1] > sortedNums[j]) {
        const temp = sortedNums[j - 1];
        sortedNums[j - 1] = sortedNums[j];
        sortedNums[j] = temp;
      }
    }
  }
  return sortedNums;
}
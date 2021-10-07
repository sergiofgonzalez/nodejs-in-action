function squares(array: number[]) {
  const result = array.map(num => num * num);
  return result;
}


console.log(squares([1, 2, 3, 4, 5]));
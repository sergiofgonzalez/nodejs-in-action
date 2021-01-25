/* this is a function that receives a callback as an argument but it is not CPS */
function myMappingOperation(array, mapFn) {
  const mappedResults = [];
  for (const item of array) {
    const result = mapFn(item);
    mappedResults.push(result);
  }
  return mappedResults;
}


const mappedItems = myMappingOperation([1, 2, 3], (item => item * 2));
console.log(mappedItems);
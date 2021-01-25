
export async function promiseAll(iterable) {
  const results = [];
  for (const promise of iterable) {
    try {
      const result = await promise;
      results.push(result);
    } catch (err) {
      console.log(`ERROR: A promise in the iterable failed!`);
      throw err;
    }
  }
  return results;
}
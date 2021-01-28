export function levelSubscribe(db) {
  db.subscribe = (pattern, listener) => {
    db.on('put', (key, val) => {
      /* array.every() checks whether all elements in the array pass the test */
      const match = Object.keys(pattern).every(k => (pattern[k] === val[k]));
      if (match) {
        listener(key, val);
      }
    });
  };
  return db;
}
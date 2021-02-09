const A_CHAR_CODE = 65;
const Z_CHAR_CODE = 90;

export function createAlphabetIterator() {
  let currCode = A_CHAR_CODE;

  return {
    next() {
      const currChar = String.fromCodePoint(currCode);
      if (currCode > Z_CHAR_CODE) {
        return { done: true };
      }

      currCode++;
      return { value: currChar, done: false };
    }
  };
}

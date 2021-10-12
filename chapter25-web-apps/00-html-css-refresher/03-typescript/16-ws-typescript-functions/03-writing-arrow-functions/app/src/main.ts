export const sentence = (
  subject: string,
  verb: string,
  ...objects: string[]
): string => {
  return capitalize(`${ subject } ${ verb }${ arrayToObjectsFormatter(objects) }.`);
};

export const arrayToObjectsFormatter = (words: string[]): string => {
  if (words.length === 0) {
    return '';
  }

  if (words.length === 1) {
    return ` ${ words[0] }`;
  }

  return ` ${ words.slice(0, -1).join(', ') }, and ${ words[words.length - 1] }`;
};

export const capitalize = (s: string): string => {
  return `${ s.charAt(0).toLocaleUpperCase()}${s.slice(1).toLocaleLowerCase()}`;
};

console.log(sentence(`the cat`, `ate`, `Apples`, `Cheese`, `Pancakes`));
console.log(sentence(`the cat`, `slept`, `all day`));
console.log(sentence(`the cat`, `Sneezed`));
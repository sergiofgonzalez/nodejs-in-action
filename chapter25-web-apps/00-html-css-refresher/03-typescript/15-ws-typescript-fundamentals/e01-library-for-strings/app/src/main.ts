
export function toTitleCase(s: string): string {
  let result = '';
  let remainingStr = s;
  while (remainingStr) {
    const matchResult = remainingStr.match(/\w+\s*/);
    const matchedStr = matchResult?.[0] ?? '';
    if (matchedStr) {
      result += `${ matchedStr[0].toLocaleUpperCase() }${ matchedStr.slice(1).toLocaleLowerCase() }`;
      remainingStr = remainingStr.slice(matchedStr.length);
    } else {
      result += remainingStr;
      remainingStr = '';
    }
  }
  return result;
}

// console.log(toTitleCase('war and peace'));
// console.log(toTitleCase('Catcher in the Rye'));
// console.log(toTitleCase('tO kILL A mOCKINGBIRD'));

export function countWords(s: string): number {
  if (s) {
    const words = s.split(/[\s-_]/);
    return words.length;
  } else {
    return 0;
  }

}


// console.log(countWords('War and Peace'));
// console.log(countWords('catcher-in-the-rye'));
// console.log(countWords('for_whom the-bell-tolls'));

export function toWords(s: string): string[] {
  if (s) {
    const words = s.split(/[\s-_]/);
    return words;
  } else {
    return [];
  }
}

export function repeat(s: string, n: number): string {
  return s.repeat(n);
}

export function isAlpha(s: string): boolean {
  // key:
  // + '^': beginning of the string
  // + '$': end of the string
  // + [A-Za-z]: alphabetic character group
  return /^[A-Za-z]+$/.test(s);
}

// console.log(isAlpha('War and Peace'));

export function isBlank(s: string): boolean {
  return /^\s*$/.test(s);
}
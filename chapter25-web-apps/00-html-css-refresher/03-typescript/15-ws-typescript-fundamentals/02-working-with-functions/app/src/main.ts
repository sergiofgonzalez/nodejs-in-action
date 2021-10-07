function snippet(text: string, length: number): string {
  if (text.length < length) {
    return text;
  }

  const ellipsis = `...`;
  let result = text.slice(0, length - ellipsis.length);

  const lastSpace = result.lastIndexOf(' ');
  result = `${result.slice(0, lastSpace != -1? lastSpace : undefined)}${ellipsis}`;
  return result;
}


/* correct call usage */
const resultOneA = snippet('TypeScript is a programming language that is a strict syntactical superset of JavaScript and adds optional static typing to the language', 40);
console.log(resultOneA); // TypeScript is a programming language... (39)

const resultOneB = snippet('Hello, world!!!', 40);
console.log(resultOneB); // whole string must be there, no ellipsis

const resultOneC = snippet('Hello, world!!!', 9);
console.log(resultOneC);

const resultOneD = snippet('Hello, world!!!', 3);
console.log(resultOneD);

/* missing second parameter */
// const resultTwo = snippet('Lorem ipsum dolor sit amet'); // an argument for 'length' was not provided

/* first parameter is of incorrect type */
// const resultThree = snippet(false, 40); // Argument of type boolean is not assignable to string

/* second parameter is of incorrect type */
// const resultFour = snippet('Lorem ipsum dolot sit amet', false); // Argument of type boolean is not assignable to number

/* result assigned to variable of incorrect type */
// let resultFive: number = snippet('Lorem ipsum dolor sit amet', 20); // Type string is not assignable to type number
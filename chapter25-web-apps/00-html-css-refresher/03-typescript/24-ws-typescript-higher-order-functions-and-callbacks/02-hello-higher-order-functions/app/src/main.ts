const favoriteGreetings: Record<string, string> = {
  John: 'hey',
  Jane: 'hello',
  Jim: 'Howdy',
  Pam: 'Hi there'
};

/* first version: very limited applicability */
function greet1(name: string) {
  const greetingToUse = favoriteGreetings[name];
  console.log(`v1: ${ greetingToUse }, ${ name }`);
}

greet1('Pam');

/* second version: breaking the tight coupling with favoriteGreetings */
function greet2(name: string, mapper: Record<string, string>) {
  const greetingToUse = mapper[name] ?? 'Hello';
  console.log(`v2: ${ greetingToUse }, ${ name }`);
}

greet2('Pam', favoriteGreetings);
greet2('Dwight', favoriteGreetings);

/* third version: receiving a function as argument for total flexibility */
function greet3(name: string, getGreeting: (name: string) => string) {
  const greetingToUse = getGreeting(name);
  console.log(`v3: ${ greetingToUse }, ${ name }`);
}

greet3('Pam', (name) => favoriteGreetings[name] ?? 'Hello');
greet3('Dwight', (name) => favoriteGreetings[name] ?? 'Hello');
greet3('Brian', () => `What's up?`);
greet3('Michael', () => {
  const hourOfTheDay = new Date().getHours();
  if (hourOfTheDay < 12) {
    return `Good morning`;
  } else if (hourOfTheDay < 19) {
    return `Good afternoon`;
  } else {
    return `Good evening`;
  }
});

/* fourth version: improve DX by returning a function */
function greet4(getGreeting: (name: string) => string) {
  return function (name: string) {
    const greetingToUse = getGreeting(name);
    console.log(`v4: ${ greetingToUse }, ${ name }`);
  };
}

const greetWithMapper = greet4((name) => favoriteGreetings[name] ?? 'Hello');
const timeBasedGreet = greet4(() => {
  const hourOfTheDay = new Date().getHours();
  if (hourOfTheDay < 12) {
    return `Good morning`;
  } else if (hourOfTheDay < 19) {
    return `Good afternoon`;
  } else {
    return `Good evening`;
  }
});
const constantGreet = greet4(() => `What's up?`);

greetWithMapper('Pam');
greetWithMapper('Dwight');
timeBasedGreet('Michael');
constantGreet('Brian');

const daysInWeek = 7;
const myName = 'Ada Lovelace';
const isRaining = false;
const today = new Date();
const months = ['January', 'February', 'March'];
const notDefined = undefined;
const nothing = null;
const add = (x: number, y: number) => x + y;
const calculator = {
  add
};


const everything = [      // Predictions    |
  daysInWeek,             // -> number      | ✔️
  myName,                 // -> string      | ✔️
  isRaining,              // -> boolean     | ✔️
  today,                  // -> object      | ✔️
  months,                 // -> object      | ✔️
  notDefined,             // -> undefined   | ✔️
  nothing,                // -> object      | ✔️
  add,                    // -> function    | ✔️
  calculator              // -> object      | ✔️
];

for (const elem of everything) {
  const type = typeof elem;
  console.log(elem, type);
}

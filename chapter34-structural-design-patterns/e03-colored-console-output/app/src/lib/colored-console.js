import style from 'ansi-styles';


export function createColoredConsole(console) {
  console.red = (message) => console.log(`${ style.red.open }${ message }${ style.red.close }`);
  console.yellow = (message) => console.log(`${ style.yellow.open }${ message }${ style.yellow.close }`);
  console.green = (message) => console.log(`${ style.green.open }${ message }${ style.green.close }`);

  return console;
}
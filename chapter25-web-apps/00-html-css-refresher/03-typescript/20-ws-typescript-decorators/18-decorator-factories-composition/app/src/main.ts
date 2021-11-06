function First() {
  console.log(`In the first Decorator factory...`);
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
  return function (constructor: Function) {
    console.log(`First decorator`);
  };
}

function Second() {
  console.log(`In the second Decorator factory...`);
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
  return function (constructor: Function) {
    console.log(`Second decorator`);
  };
}


@First()
@Second()
class Target {}
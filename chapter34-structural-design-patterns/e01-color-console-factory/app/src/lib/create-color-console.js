class ColorConsole {
  log() {}
}

class RedConsole extends ColorConsole {
  log(str) {
    console.log(`\x1b[31m%s\x1b[0m`, str);
  }
}

class BlueConsole extends ColorConsole {
  log(str) {
    console.log(`\x1b[34m%s\x1b[0m`, str);
  }
}

class GreenConsole extends ColorConsole {
  log(str) {
    console.log(`\x1b[32m%s\x1b[0m`, str);
  }
}

export function createColorConsole(color) {
  if (color === 'red') {
    return new RedConsole();
  } else if (color === 'blue') {
    return new BlueConsole();
  } else if (color === 'green') {
    return new GreenConsole();
  } else {
    throw new Error(`Unexpected color ${ color }`);
  }
}
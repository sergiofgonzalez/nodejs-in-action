class Logger {
  #label = '';

  constructor(label) {
    this.#label = label;
  }

  log(message) {
    console.log(`\x1b[34m[${ this.#label }]\x1b[0m`, message);
  }
}

export const logger = new Logger('1.0.0');
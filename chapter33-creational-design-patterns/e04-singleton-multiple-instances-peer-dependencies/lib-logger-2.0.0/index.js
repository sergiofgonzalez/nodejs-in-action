class Logger {
  #label = '';

  constructor(label) {
    this.#label = label;
  }

  log(message) {
    console.log(`\x1b[32m[${ this.#label }]\x1b[0m`, message);
  }
}

export const logger = new Logger('2.0.0')
class Logger {
  constructor(name) {
    this.name = name;
  }

  log(message) {
    console.log(`[${ this.name }] ${ message }`);
  }

  info(message) {
    console.log(`[info] ${ message }`);
  }

  verbose(message) {
    console.log(`[verbose] ${ message }`);
  }
}

module.exports = Logger;
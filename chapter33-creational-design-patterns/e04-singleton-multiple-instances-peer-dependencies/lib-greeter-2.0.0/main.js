let logger;

export function sayHelloToJason() {
  if (!logger) {
    logger = global.logger;
  }

  logger.log('sayHelloToJason(): Hello to Jason Isaacs!');
}

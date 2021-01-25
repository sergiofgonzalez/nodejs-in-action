let logger;

export function hello() {
  if (!logger) {
    logger = global.logger;
  }
  logger.log(`hello(): Hello to Jason Isaacs!`);
}

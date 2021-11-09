import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { container } from './config/ioc.config';
import { Logger } from './interfaces/logger.interface';
import { TYPES } from './constants/types';

@injectable()
class Main {
  constructor(@inject(TYPES.Logger) private logger: Logger) {}

  run() {
    this.logger.log(`Hello to Jason Isaacs!`);
  }
}

// run the app (Composition root)
const main = container.resolve(Main);
main.run();
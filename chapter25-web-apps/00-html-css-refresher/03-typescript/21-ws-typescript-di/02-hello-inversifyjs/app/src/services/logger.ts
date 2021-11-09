import { injectable } from 'inversify';
import { Logger } from '../interfaces/logger.interface';

@injectable()
export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}
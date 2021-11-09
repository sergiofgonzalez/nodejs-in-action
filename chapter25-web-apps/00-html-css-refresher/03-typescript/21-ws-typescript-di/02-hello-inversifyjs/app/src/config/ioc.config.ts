import { Container } from 'inversify';
import { ConsoleLogger } from '../services/logger';
import { Logger } from '../interfaces/logger.interface';
import { TYPES } from '../constants/types';

export const container = new Container();
container.bind<Logger>(TYPES.Logger).to(ConsoleLogger);
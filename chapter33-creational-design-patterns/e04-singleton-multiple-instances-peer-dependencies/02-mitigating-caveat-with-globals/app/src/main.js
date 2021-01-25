import { sayHelloToJason } from '@test/greeter';
import { hello } from '@test/hello';
import { logger } from '@test/logger';

global.logger = logger;

sayHelloToJason();
hello();
logger.log('Hello, world!');

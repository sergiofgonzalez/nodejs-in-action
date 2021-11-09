import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { container } from './config/ioc.config';
import { TYPES } from './constants/types';
import { UserRegistrationService } from './services/user-registration-service';

@injectable()
export class Main {

  constructor(@inject(TYPES.UserRegistrationService) private userRegistrationService: UserRegistrationService) {}

  run(): void {
    this.userRegistrationService.registerUser('jason.isaacs@example.com', 'secret123')
      .then(() => console.log(`Main.run(): completed!`))
      .catch((err) => console.log(`ERROR:`, err));
  }
}

// run the app (Composition root)
const main = container.resolve(Main);
main.run();
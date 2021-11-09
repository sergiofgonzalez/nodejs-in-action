import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { container } from './config/ioc.config';
import { TYPES } from './constants/types';
import { UserRepository } from './interfaces/user-repository';
import { EmailService } from './interfaces/email-service';

@injectable()
export class UserRegistrationService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.EmailService) private emailService: EmailService
  ) {}

  async registerUser(email: string, password: string): Promise<void> {
    const registeredUser = await this.userRepository.save({ email, password });
    await this.emailService.sendEmail(registeredUser.email, 'Welcome to my website!');
  }
}

// run the app (Composition root)
const userRegistrationService = container.resolve(UserRegistrationService);
userRegistrationService.registerUser('jason.isaacs@example.com', 'secret123');

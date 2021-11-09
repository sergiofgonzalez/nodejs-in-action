import { injectable, inject } from 'inversify';
import { TYPES } from '../constants/types';
import { EmailService } from '../interfaces/email-service';
import { UserRepository } from '../interfaces/user-repository';



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
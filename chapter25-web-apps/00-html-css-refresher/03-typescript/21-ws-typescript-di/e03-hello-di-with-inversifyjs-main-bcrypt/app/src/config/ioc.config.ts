import { Container } from 'inversify';
import { TYPES } from '../constants/types';
import { EmailService } from '../interfaces/email-service';
import { UserRepository } from '../interfaces/user-repository';
import { FakeEmailService } from '../services/fake-email-service';
import { FileUserRepository } from '../services/file-user-repository';
import { PasswordSaltGenerator } from '../services/password-salt-generator';
import { UserRegistrationService } from '../services/user-registration-service';

export const container = new Container();
container.bind<EmailService>(TYPES.EmailService).to(FakeEmailService);
container.bind<UserRepository>(TYPES.UserRepository).to(FileUserRepository);
container.bind<UserRegistrationService>(TYPES.UserRegistrationService).to(UserRegistrationService);
container.bind<PasswordSaltGenerator>(TYPES.PasswordSaltGenerator).to(PasswordSaltGenerator);

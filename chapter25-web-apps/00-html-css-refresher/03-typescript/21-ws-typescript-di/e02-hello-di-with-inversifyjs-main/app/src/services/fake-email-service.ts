import { injectable } from 'inversify';
import { EmailService } from '../interfaces/email-service';

@injectable()
export class FakeEmailService implements EmailService {
  sendEmail(to: string, subject: string, body?: string): Promise<void> {
    console.log(
      `sending email...
      To: ${ to }
      Subject: ${ subject }
      Body:
      ${ body?? '<EOM>' }
      `);
      return Promise.resolve();
  }
}
function triggerNotification(emailClient: any, logger: any) {
  if (logger && typeof logger.log === 'function') {
    logger.log('Sending email...');
  }
  if (emailClient && typeof emailClient.send === 'function') {
    emailClient.send('Message sent!');
  }
}

/* nothing happens as arguments are sent in the incorrect order */
triggerNotification({ log: (msg: string) => console.log('INFO', msg) }, { send: (body: string) => console.log(`EMAIL:`, body) });

/* now the call succeeds */
triggerNotification({ send: (body: string) => console.log(`EMAIL:`, body) }, { log: (msg: string) => console.log('INFO', msg) });

interface Logger {
  log: (msg: string) => void;
}

let logger: Logger;
const log = { log: (msg: string) => console.log(msg) };

// eslint-disable-next-line prefer-const
logger = log; // structural typing

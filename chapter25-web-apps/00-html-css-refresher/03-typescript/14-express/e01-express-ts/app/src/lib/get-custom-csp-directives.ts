import helmet from 'helmet';
import { getDefaultDirectives } from 'helmet/dist/middlewares/content-security-policy';
import createPinoLogger from 'pino';

import { Session } from 'express-session';

export interface ISessionData extends Session {
  username: string;
}

const logger = createPinoLogger({ name: 'get-custom-csp-directives '});

export function getCustomCspDirectives() {
  const defaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
  logger.info({ defaultDirectives }, `Default helmet CSP directives`);

  /* customization */
  delete defaultDirectives['upgrade-insecure-requests'];

  const finalDirectives = {
    ...defaultDirectives
  };

  logger.info({ finalDirectives }, `Updated CSP directives`);

  return finalDirectives;
}
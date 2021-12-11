import helmet from 'helmet';
import createPinoLogger from 'pino';

const logger = createPinoLogger({ name: 'get-custom-csp-directives' });

export function getCustomCspDirectives() {
  const defaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
  logger.info({ defaultDirectives }, `Default helmet CSP directives`);

  /* customization */
  delete defaultDirectives['upgrade-insecure-requests'];

  const finalDirectives = {
    ...defaultDirectives
  };

  logger.info({ finalDirectives }, `CSP directives have been updated`);

  return finalDirectives;
}
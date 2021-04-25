import helmet from 'helmet';
import createPinoLogger from 'pino';

const logger = createPinoLogger({ name: 'get-custom-csp-directives' });

export function getCustomCspDirectives() {
  const defaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
  logger.info({ defaultDirectives }, `Default helmet CSP directives`);

  /* customization */
  delete defaultDirectives['upgrade-insecure-requests'];

  const finalDirectives = {
    ...defaultDirectives,
    'img-src': `'self' blob:`,
    'script-src-elem': `'self' https://cdn.jsdelivr.net/npm/web-streams-polyfill@2.0.2/dist/ponyfill.min.js https://code.jquery.com/jquery-3.5.1.slim.min.js https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js`,
    'frame-src': `https://jimmywarting.github.io/`,
    'connect-src': `'self' https://*.amazonaws.com`
  };

  logger.info({ finalDirectives }, `CSP directives have been updated`);

  return finalDirectives;
}
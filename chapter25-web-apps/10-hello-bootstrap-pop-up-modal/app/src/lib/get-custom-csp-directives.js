import helmet from 'helmet';
import { buildLogger } from './logger.js';
import util from 'util';

const logger = buildLogger('get-custom-csp-directives');

export function getCustomCspDirectives() {
  const defaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
  delete defaultDirectives['upgrade-insecure-requests'];

  const finalDirectives = {
    ...defaultDirectives,
    'img-src': `'self' blob:`,
    'script-src-elem': `'self' https://code.jquery.com/jquery-3.5.1.slim.min.js https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js`,
  };

  logger.info(`CSP configuration: ${ util.inspect(finalDirectives) }`);

  return finalDirectives;
}
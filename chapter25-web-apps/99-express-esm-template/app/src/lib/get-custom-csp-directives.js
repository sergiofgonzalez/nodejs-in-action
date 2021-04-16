import helmet from 'helmet';
import { buildLogger } from './logger.js';
import util from 'util';

const logger = buildLogger('get-custom-csp-directives');

export function getCustomCspDirectives() {
  const defaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
  delete defaultDirectives['upgrade-insecure-requests'];

  const finalDirectives = {
    ...defaultDirectives,
    'img-src': `'self' blob:`
  };

  logger.info(`CSP configuration: ${ util.inspect(finalDirectives) }`);

  return finalDirectives;
}
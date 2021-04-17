import { buildLogger } from '../../lib/logger.js';


const logger = buildLogger('routes:health-check');

export function healthCheck(req, res) {
  logger.debug(`About to process health-check request`);

  res.json({ healthy: true, timestamp: new Date().toISOString() });
}

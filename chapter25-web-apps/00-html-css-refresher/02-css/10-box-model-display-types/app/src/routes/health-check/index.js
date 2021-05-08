import createPinoLogger from 'pino';


const logger = createPinoLogger({ name: 'routes:health-check', level: process.env.LOGGER_LEVEL ?? 'info' });

export function healthCheck(req, res) {
  logger.debug(`About to process health-check request`);

  res.json({ healthy: true, timestamp: new Date().toISOString() });
}

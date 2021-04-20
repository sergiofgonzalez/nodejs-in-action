import createPinoLogger from 'pino';

const parentlogger = createPinoLogger({ level: process.env.LOGGER_LEVEL ?? 'info' });
parentlogger.info({module: 'logger' }, 'pino parentLogger instance successfully created');

export function createLogger(name, level=process.env.LOGGER_LEVEL) {
  const moduleName = name ?? 'not set';
  parentlogger.info({ module: 'logger', childLogger: moduleName }, `Creating pino child logger for module=${ name }`);
  return parentlogger.child({ module: moduleName, level });
}
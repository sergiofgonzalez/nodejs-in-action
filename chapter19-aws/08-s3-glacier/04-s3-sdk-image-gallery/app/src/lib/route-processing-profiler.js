import { buildLogger } from './logger.js';
import onHeaders from 'on-headers';

const logger = buildLogger('route-processing-profiler');
const profiler = buildLogger('PERF');

export function routeProcessingProfiler() {
  logger.info(`Setting up route processing profiler middleware`);
  return routeProcessingProfilerMiddleware;

}

function routeProcessingProfilerMiddleware(req, res, next) {
  const startTime = process.hrtime.bigint();

  onHeaders(res, () => {
    profiler.info(`processing of ${ req.url } took ${ process.hrtime.bigint() - startTime } nanos`);
  });

  next();
}

import createPinoLogger from 'pino';

const logger = createPinoLogger({ name: 'routes:error-routes' });

export function notFound(req, res) {
  res.status(404)
    .format({
      html: () => res.render('404', { page: req.url }),
      json: () => res.send({ message: `Could not find ${ req.url }`}),
      text: () => res.send(`Could not find ${ req.url }`)
    });
}

export function error(err, req, res, next) {
  let msg;
  logger.error({ err }, `error found while processing request: ${ err.message }`);
  res.statusCode = err.statusCode ?? 500;
  msg = `${ res.statusCode } ${ err.name ?? 'Internal Server Error '} `;
  const detailedMessage = process.NODE_ENV != 'production'? err.message : 'The request could not be processed';

  if (res.headersSent) {
    return next(err);
  }

  res.format({
    html: () => res.render('error', { status: res.statusCode, errMessage: msg, errDetailedMessage: detailedMessage }),
    json: () => res.send({ error: msg, status: res.statusCode, description: detailedMessage }),
    text: () => res.send(`An error occurred: Message: ${ msg } (HTTP status code ${ res.statusCode })`),
    default: () => res.status(406).send('Not Acceptable')
  });
}

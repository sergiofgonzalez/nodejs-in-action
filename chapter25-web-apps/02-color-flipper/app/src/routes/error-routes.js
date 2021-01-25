const logger = require('../lib/logger')('routes:error-routes');

function notFound(req, res) {
  res.status(404)
    .format({
      html: () => res.render('404', { page: req.url }),
      json: () => res.send({ message: `Could not find ${ req.url }`}),
      text: () => res.send(`Could not find ${ req.url }`)
    });
}

function error(err, req, res, next) {
  let msg;
  logger.error(`error found while processing request: ${ err.message }`);
  res.statusCode = err.statusCode ?? 500;
  msg = `${ res.statusCode } ${ err.name ?? 'Internal Server Error '}`;

  res.format({
    html: () => res.render('error', { errMessage: msg, status: res.statusCode }),
    json: () => res.send({ error: msg, status: res.statusCode }),
    text: () => res.send(`An error occurred: Message: ${ msg } (HTTP status code ${ res.statusCode })`),
    default: () => res.status(406).send('Not Acceptable')
  });

  next(err);
}

module.exports = { notFound, error };
import { buildLogger } from '../../lib/logger.js';
import Joi from 'joi';
import createError from 'http-errors';
// import fs, { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/*
  ESM trick to reconstruct CommonJS `__dirname` value

  In ESM, you can get a reference to the current file URL
  using the special object `import.meta`.
  Specifically, `import.meta.url` will return a reference
  to the current module path in the format
  `file:///path/to/current_module.js`
  which can be used to reconstruct `__filename` and
  `__dirname`.
*/
const __dirname = dirname(fileURLToPath(import.meta.url));

const logger = buildLogger('routes:download');



export async function download(req, res, next) {
  function sendFile(filename) {
    return new Promise((resolve, reject) => {
      res.sendFile(filename, err => {
        if (!err) {
          return resolve();
        }
        return reject(err);
      });
    });
  }

  const filename = req.query.filename;

  try {
    validateParameter(filename);
  } catch (err) {
    logger.error(`Failed to validate query parameter "filename"=${ filename }: ${ err.message }`);
    return next(createError.BadRequest(`"filename" query parameter is required`));
  }

  try {
    const imagePath = join(__dirname, '..', '..', process.env.PATH_TO_PUBLIC_STATIC_RESOURCES, 'images', filename);
    await sendFile(imagePath);
  } catch (err) {
    logger.error(`Could not process download image request for filename=${ filename } query parameter: ${ err.message }`);
    next(createError.InternalServerError(err.message));
  }
}




function validateParameter(filename) {
  logger.debug(`Validating request query parameter 'filename': ${ filename }`);
  const schema = Joi.object().keys({
    filename: Joi.string().max(255).required()
  }).required();
  const { error } = schema.validate({ filename });
  if (error) {
    logger.error(`Validation failed for 'filename' request parameter: ${ error }`);
    throw error;
  }
}

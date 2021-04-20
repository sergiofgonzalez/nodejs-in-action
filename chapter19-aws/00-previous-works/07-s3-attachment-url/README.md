# 07 &mdash; AWS S3 Attachment URL
> Obtain a signed S3 url that provides a limited time public access to a file.

## About the example

The project illustrates how to create a module that provides metadata information about an existing *S3 object* which includes a *pre-signed URL* for the object that grants anyone in possession of the URL public access to object for a limited time period.

The function exported from the module features the following signature:

```javascript
async function getAttachmentInfo({
  bucket: '<bucket>',
  pathToObject: '<object-key-for-the-attachment>',
  ttlSeconds: '<optional: validity-of-the-presigned-url' })
```

If the object exists, the function will return an object with the following information:

```javascript
{
  AcceptRanges,         /* unit for the object size, e.g. bytes */
  LastModified,         /* date/time at which the object was last changed */
  ContentLength,        /* the size of the object, in *AcceptRanges* unit */
  ETag,                 /* ETag of the object that uniquely identifies the object contents */
  ContentType,          /* MIME type of the object, e.g. 'image/png' */
  ServerSideEncryption, /* the current status of the server-side encryption for the object, e.g. 'AES256' */
  Metadata,             /* objec'ts custom metadata (if any), or empty if not set */
  url                   /* the presigned URL for the object, which will grant you public access for the given ttlSeconds */
}
```

In order to run the example, you have to do:

```bash
[AWS_PROFILE=<aws-profile-to-use>] npm start <bucket> <path/to/s3/object>
```

If you don't provide a value for `AWS_PROFILE` the default credentials resolution chain will be used.

You can *prettify* the logs using:

```bash
[AWS_PROFILE=<aws-profile-to-use>] npm start <bucket> <path/to/s3/object> | node_modules/.bin/pino-pretty
```

| NOTE: |
| :---- |
| The project uses *AWS SDK for JavaScript v2*. |

## `ow` and `pino`

This project uses [`ow`](https://github.com/sindresorhus/ow) for argument validation and [`pino`](https://github.com/pinojs/pino) for logging.

Currently, [`ow`](https://github.com/sindresorhus/ow) only works if importing v0.19.0. Versions greater than `"0.19.0"` fail because `ow.<type>` (as in `ow.object.exactShape(...)`) resolves to undefined.

The author is working in native support for *ES modules*, which will resolve the issue, but as of v0.23.0 is still failing.

For Node.js logging, I have started using [`pino`](https://github.com/pinojs/pino). This is a JSON first logger, so for human readable output you have to use [`pino-pretty`](https://github.com/pinojs/pino-pretty). The latter is configured with a [`pino-prettyrc`](.pino-prettyrc), a JSONC file that lets you customize the *prettifier* behavior.
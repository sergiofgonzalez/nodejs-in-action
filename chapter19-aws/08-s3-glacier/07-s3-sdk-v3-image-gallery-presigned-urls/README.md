# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 8: Amazon S3 and Glacier
#### 07 &mdash; S3 SDK v3: Image gallery on *Amazon S3* with presigned S3 urls
> Illustrates how to use the AWS SDK for Node.js (v3) to create a simple application that allows the user to upload/download/view images using *Amazon S3* presigned URLs

##### About the example

The example is a reimplementation of [04 &mdash; S3 SDK: Image gallery on *Amazon S3*](../04-s3-sdk-image-gallery) but using the new version of the AWS SDK for Node.js library (v3) and using presigned URLs as the fundamental way of interacting with *Amazon S3* to download/upload objects.
That relieves the backend from many responsibilities and makes for better concurrency as file uploads/downloads are handled by the browser itself, and therefore performed from each user's computer without any heavyweight backend interaction.

Additionally, a few other minor technical modifications were performed.

In summary:
+ Introduced AWS SDK for JavaScript v3 modules as dependencies and removed AWS SDK v2 dependency
+ Use of presigned URLs for downloading/viewing/uploading files
+ Remove logging libraries `morgan` and `winston` in favor of `pino`.
+ Minor enhancements to frontend application (use of spinners, message box, ...)
+ CSP adjustments

###### Migrating to AWS SDK v3

The `aws-sdk` module was removed from `package.json` while the individual `@aws-sdk` submodules were added instead. The new AWS SDK for Node.js v3 uses the *Command* pattern so all operations are performed in the following way:

```javascript
const params = {
  /* set up parameters for the command */
};

const command = new CommandRepresentingAwsOpertion(params);

const result = s3Client.send(command);
```

For example, to obtain the information about an *Amazon S3 object*:

```javascript
const params = {
  Bucket: process.env.BUCKET_NAME,
  Key: file.Key
};
try {
  const result = await s3Client.send(new HeadObjectCommand(params));
  return result;
} catch (err) {
  throw new Error('Could not access object data');
}
```

###### Using presigned URLs for downloading/viewing/uploading files

In order to interact with *Amazon S3* from your frontend JavaScript, the first thing you have to do is configure the *CORS* policy for your bucket. Otherwise, the browser will complain that you're doing cross-origin requests, and you wouldn't be able to fix that from the *ExpressJS* server, as it is not involved in these operations.

This is done from the *AWS console* using a JSON document similar to this one:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": [
      "GET",
      "PUT"
    ],
    "AllowedOrigins": [
      "http://localhost:5000"
    ],
    "ExposeHeaders": [
      "x-amz-server-side-encryption",
      "x-amz-request-id",
      "x-amz-id-2"
    ],
    "MaxAgeSeconds": 3000
  }
]
```

In this case, as I was running the application from `localhost` I configured the bucket to allow `GET` (for view/download) and `PUT` (upload) operations from `http://localhost:5000`.


Then, to download files the frontend service [`download-file.js`](app/src/public/javascript/services/download-file.js) was modified to first obtain the presigned URL for the file to download, and then perform the download directly from *Amazon S3*:

```javascript
import { streamSaver } from './stream-saver.js';

export async function downloadFile(filename) {
  const url = `/download/${ filename }`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`fetch for /download/${ filename } failed with ${ res.statusText } (${ res.status })`);
    throw new Error('Network error for /download/:filename URL');
  }
  const { presignedUrl } = await res.json();
  console.log(`Obtained presigned URL for ${ filename }: `, presignedUrl);

  const fileStream = streamSaver.createWriteStream(filename);
  const downloadResponse = await fetch(presignedUrl);
  if (!downloadResponse.ok) {
    console.error(`fetch for presigned URL failed with ${ downloadResponse.statusText } (${ downloadResponse.status })`);
    throw new Error('Network error fetching presigned URL');
  }
  const readableStream = downloadResponse.body;

  // optimized approach using streams and pipeTo
  if (window.WritableStream && readableStream.pipeTo) {
    await readableStream.pipeTo(fileStream);
    console.log(`${ filename } successfully saved`);
  } else {
    console.error(`Cannot use streams in this browser runtime`);
    throw new Error('Unsupported runtime');
  }
}
```

Obtaining the presigned URL is a simple interaction with our Node.js server, while the file download consists in sending a GET request to the presigned URL and then using streams piping the response body to a write stream.

For the view operation that we enable for images, it is quite similar:

```javascript
export async function getObjectUrlForImage(filename) {

  const res = await fetch(`/download/${ filename }`);
  if (!res.ok) {
    console.error(`fetch for /download/${ filename } failed with ${ res.statusText } (${ res.status })`);
    throw new Error('Network error for /download/:filename image URL');
  }
  const { presignedUrl } = await res.json();
  console.log(`Obtained presigned URL for image file ${ filename }: `, presignedUrl);

  const downloadResponse = await fetch(presignedUrl);
  if (!downloadResponse.ok) {
    console.error(`fetch for presigned image URL failed with ${ downloadResponse.statusText } (${ downloadResponse.status })`);
    throw new Error('Network error fetching presigned image URL');
  }
  const imageBlob = await downloadResponse.blob();
  const objectUrl = URL.createObjectURL(imageBlob);

  return objectUrl;
}
```

We first obtain the presigned URL, and then submit an HTTP GET to the presigned URL. This time, instead of piping the response to a write stream, what we do is create an *object URL* for the image, so that we can display it in our modal dialog.

The upload operation requires extensive changes in the frontend, as in the previous version the file upload was handled automatically by a form without any JavaScript intervention.

This new approach require us to to register an event listener for the `'submit'` event so that we can include some custom logic:

```javascript
form.addEventListener('submit', async (evt) => {
  console.log(`Processing form submission: filename=${ appState.selectedFile.name }`);
  evt.stopPropagation();
  evt.preventDefault();
  submitBtn.disabled = true;
  spinner.style.display = '';
  spinner.style.visibility = 'visible';
  submitBtnLabel.textContent = 'Uploading...';
  await uploadFile(appState.selectedFile);
  appState.selectedFile = null;
  await refreshUploadedFilesInView();
  updateView();
});
```

First thing we do is disable the *default behavior of the submit button*, as we will be doing it ourselves. Perform some view related actions and then delegate to the `uploadFile(...)` service to do the actual upload:

```javascript
export async function uploadFile(file) {
  const url = `/upload`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ filename: file.name })
  });
  if (!res.ok) {
    console.error(`fetch for /upload URL failed with ${ res.statusText } (${ res.status })`);
    throw new Error('Network error for /upload URL');
  }
  const { presignedUrl } = await res.json();
  console.log(`Obtained presigned URL for ${ file.name }: `, presignedUrl);

  const uploadResponse = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      'Content-Length': file.size
    },
    body: file
  });
  if (!uploadResponse.ok) {
    console.error(`fetch for /upload file failed with ${ res.statusText } (${ res.status })`);
    throw new Error('Network error for /upload file');
  }
  console.log(`Successfully uploaded: File: ${ file.name }, Size: ${ file.size }, Type: ${ file.type }`);
}
```

The first thing that we do is invoke ourselves the `/upload` endpoint (this was called automatically by the form in the previous version) that will return the presigned URL for the file we are about to upload.

Once we have the presigned URL, we submit a subsequent `PUT` that includes a few necessary headers so that the file is correctly registered in *Amazon S3* service. In the body of the request, we simply pass the `file` object that is returned by the `<input type="file" ...>` HTML element.

| NOTE: |
| :---- |
| There is no current support for streams in `fetch()`'s body. Thus, doing things like `readableStream = await file.stream().getReader()` and then passing the readable stream to the `body` element of the fetch won't work. |

The changes on the backend side are not that deep and essentially consisted in eliminating all the *GetObjet*/*PutObject*/*DeleteObject* operations as those are now handled from the frontend. In particular, *busboy* related middleware was removed.

The download operation now simply consists in returning the presigned URL for the object to download (`'GET'`), the upload operation now consists in also returning the presigned URL for the object to upload (`'PUT'`). Both operations are now implemented in the [`s3-get-presigned-url.js](app/src/services/s3-get-presigned-url.js) file:

```javascript
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import createPinoLogger from 'pino';
import Joi from 'joi';

const logger = createPinoLogger({ name: 'services:s3-get-presigned-url', level: process.env.LOGGER_LEVEL ?? 'info' });

logger.debug({ AWS_PROFILE: process.env.AWS_PROFILE, AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION }, `Setting up S3Client`);
const s3Client = process.env.AWS_PROFILE ? new S3Client({
  credentials: fromIni({
    profile: process.env.AWS_PROFILE,
    region: process.env.AWS_DEFAULT_REGION ?? 'us-east-1'
  })
}) : new S3Client({
  region: process.env.AWS_DEFAULT_REGION ?? 'us-east-1'
});



export async function getPresignedUrl({ filename, action='GET', ttlSeconds=300 }) {
  validateParameters({ filename, action, ttlSeconds });

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename
  };

  let command;
  if (action === 'GET') {
    command = new GetObjectCommand(params);
  } else {
    command = new PutObjectCommand(params);
  }

  const presignedUrl = await getSignedUrl(s3Client, command, ttlSeconds);
  logger.info({ bucket: params.Bucket, key: params.Key, expiresIn: ttlSeconds, presignedUrl }, `Presigned URL for ${ params.Bucket }/${ params.Key }`);

  return presignedUrl;
}

function validateParameters({ filename, action, ttlSeconds }) {
  logger.debug({ filename, action, ttlSeconds }, `Validating getPresignedUrl function arguments }`);
  const schema = Joi.object().keys({
    filename: Joi.string().min(3).max(63).required(),
    action: Joi.string().valid('GET', 'PUT').required(),
    ttlSeconds: Joi.number().min(5).max(30 * 60).required()
  }).required();
  const { error } = schema.validate({ filename, action, ttlSeconds });
  if (error) {
    logger.error({ error }, `Validation failed for getPresignedUrl parameters: filename=${ filename }, action=${ action }: ${ error }`);
    throw error;
  }
}
```

###### Removing `morgan` and `winston` in favor of `pino`

The request logger which was based in [`morgan`](https://github.com/expressjs/morgan), and the general logger which was based in [`winston`](https://github.com/winstonjs/winston) were changed for [`pino`](https://github.com/pinojs).

[`pino`](https://github.com/pinojs) is a JSON-first, extremely simple-to-use and configure logger for Node.js.

Request logging is configured with the `express-pino-logger` middleware:

```javascript
import createPinoRequestLogger from 'express-pino-logger';

const pinoRequestLogger = createPinoRequestLogger();


app.use(pinoRequestLogger);
```

That will inform us whether the request errored or not, and if it was successful it will output the request attributes and how much it took to complete:

```json
{"level":30,"time":1619345702683,"pid":29271,"hostname":"ubuntu-20","req":{"id":2,"method":"GET","url":"/list-files","headers":{"host":"localhost:5000","connection":"keep-alive",...}},"responseTime":724,"msg":"request completed"}
```

The general logger is also extremely easy to use so I didn't create any library for it:

```javascript
import createPinoLogger from 'pino';

const logger = createPinoLogger({ name: 'services:s3-list-objects', level: process.env.LOGGER_LEVEL ?? 'info' });

logger.debug({ AWS_PROFILE: process.env.AWS_PROFILE, AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION }, `Setting up S3Client`);

logger.info({ params }, `Listing objects in ${ params.Bucket }`);

logger.error({ err }, `HeadObjectCommand failed for reading mimeType: file=${ file.Key }, err=${ err.msg }`);
```

The pino logger is configured with `info` level by default. As I didn't create any lib I included the `level` setting based on a global argument.

Note that [`pino`](https://github.com/pinojs) being a JSON logger, it is not very friendly for humans. However, installing the [`pino-pretty`](https://github.com/pinojs/pino-pretty) module as a *dev dependency* and adding an NPM task `"start-pino-pretty"` renders beautifully the JSON log lines [`pino`](https://github.com/pinojs) produces.

[`pino-pretty`](https://github.com/pinojs/pino-pretty) reads the information of the `.pino-prettyrc` to configure the rules that dictate how the log lines will look.

###### Minor frontend enhancements: spinner and alert box

A spinner and an alert box were added. The visibility is controlled mostly from JavaScript doing:

```javascript
    /* hide spinner when not uploading */
    spinner.style.visibility = 'hidden';
    spinner.style.display = 'none';

    /* show spinner when processing uploads */
    spinner.style.display = '';
    spinner.style.visibility = 'visible';
```

###### CSP adjustments

To enable interacting with *Amazon S3* endpoints from frontend JavaScript using `fetch()` you need to add the `'connect-src'` directive as seen below.

```javascript
const finalDirectives = {
  ...defaultDirectives,
  'img-src': `'self' blob:`,
  'script-src-elem': `'self' https://cdn.jsdelivr.net/npm/web-streams-polyfill@2.0.2/dist/ponyfill.min.js https://code.jquery.com/jquery-3.5.1.slim.min.js https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js`,
  'frame-src': `https://jimmywarting.github.io/`,
  'connect-src': `'self' https://*.amazonaws.com`
};
```

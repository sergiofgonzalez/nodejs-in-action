import { upload } from './upload.js';
import { PassThrough } from 'stream';

export function createUploadStream(filename) {
  const connector = new PassThrough();
  upload(filename, connector);
  return connector;
}
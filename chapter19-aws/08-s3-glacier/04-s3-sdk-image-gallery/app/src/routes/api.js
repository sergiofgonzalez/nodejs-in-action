import { greeter } from './greeter/index.js';
import { healthCheck } from './health-check/index.js';
import { upload, listUploadedfiles } from './upload/index.js';
import { download } from './download/index.js';

export const api = {
  greeter,
  healthCheck,
  upload,
  listUploadedfiles,
  download
};

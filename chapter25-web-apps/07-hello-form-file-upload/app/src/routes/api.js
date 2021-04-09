import { greeter } from './greeter/index.js';
import { healthCheck } from './health-check/index.js';
import { upload, listUploadedfiles } from './upload/index.js';

export const api = {
  greeter,
  healthCheck,
  upload,
  listUploadedfiles
};

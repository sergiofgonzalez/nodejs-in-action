import { createUploadStream } from './lib/create-upload-stream.js';

const upload = createUploadStream('file-created-from-text.txt');
upload.write('Hello to Jason Isaacs!');
upload.end();

import axios from 'axios';

export function upload(filename, contentStream) {
  return axios.post(
    `http://localhost:5000`,
    contentStream,
    {
      headers: {
        'Content-Type': 'application/octet-stream',
        'x-filename': filename
      }
    }
  );
}
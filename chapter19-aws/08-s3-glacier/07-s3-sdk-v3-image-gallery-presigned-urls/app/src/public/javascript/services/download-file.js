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

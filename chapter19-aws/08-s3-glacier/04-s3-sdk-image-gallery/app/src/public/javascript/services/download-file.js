import { streamSaver } from './stream-saver.js';

export async function downloadFile(filename) {
  const url = `download/${ filename }`;
  const fileStream = streamSaver.createWriteStream(filename);

  const res = await fetch(url);
  const readableStream = res.body;

  // optimized approach using streams and pipeTo
  if (window.WritableStream && readableStream.pipeTo) {
    await readableStream.pipeTo(fileStream);
    console.log(`${ filename } successfully saved`);
  } else {
    console.error(`Cannot use streams in this browser runtime`);
    throw new Error('Unsupported runtime');
  }
}

import { createReadStream, createWriteStream} from 'fs';
import { createGzip, createDeflate, createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';
import path from 'path';
import { StreamTimeMonitor } from './lib/stream-time-monitor.js';
import { getFileSize } from './lib/get-file-size.js';

const inputFilename = process.argv[2] ?? 'package-lock.json';

const outputFilenameGzip = path.join('sample_files', `${ inputFilename }.gz`);
const outputFilenameDeflate = path.join('sample_files', `${ inputFilename }.deflate`);
const outputFilenameBrotli = path.join('sample_files', `${ inputFilename }.brotli`);

const inputStream = createReadStream(inputFilename);
let inputFileSize;

const timeMonitorGzip = new StreamTimeMonitor();
const timeMonitorDeflate = new StreamTimeMonitor();
const timeMonitorBrotli = new StreamTimeMonitor();


async function getBenchmarkResults(timeMonitor, outputFilename) {
  const duration = timeMonitor.getDuration();
  if (!inputFileSize) {
    inputFileSize = await getFileSize(inputFilename);
  }
  const outputFileSize = await getFileSize(outputFilename);
  const compressionRatio = (inputFileSize / outputFileSize).toFixed(2);
  return {
    duration,
    inputFileSize,
    outputFileSize,
    compressionRatio
  };
}

pipeline(
  inputStream,
  timeMonitorGzip,
  createGzip(),
  createWriteStream(outputFilenameGzip),
  async (err) => {
    if (err) {
      console.error(`ERROR: main: could not process compression pipeline: ${ err.message }`);
      process.exit(1);
    }
    console.log(`Gzip:`, await getBenchmarkResults(timeMonitorGzip, outputFilenameGzip));
  }
);

pipeline(
  inputStream,
  timeMonitorDeflate,
  createDeflate(),
  createWriteStream(outputFilenameDeflate),
  async (err) => {
    if (err) {
      console.error(`ERROR: main: could not process compression pipeline: ${ err.message }`);
      process.exit(1);
    }
    console.log(`Deflate:`, await getBenchmarkResults(timeMonitorDeflate, outputFilenameDeflate));
  }
);

pipeline(
  inputStream,
  timeMonitorBrotli,
  createBrotliCompress(),
  createWriteStream(outputFilenameBrotli),
  async (err) => {
    if (err) {
      console.error(`ERROR: main: could not process compression pipeline: ${ err.message }`);
      process.exit(1);
    }
    console.log(`Brotli:`, await getBenchmarkResults(timeMonitorBrotli, outputFilenameBrotli));
  }
);
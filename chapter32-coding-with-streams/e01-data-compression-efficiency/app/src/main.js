import { createGzip, createDeflate, createBrotliCompress } from 'zlib';
import { CompressionBenchmarkRunner } from './lib/compression-benchmark-runner.js';
import { createReadStream } from 'fs';
import { Tabulator } from './lib/tabulator.js';

const inputFilename = process.argv[2] ?? 'package-lock.json';
const inputStream = createReadStream(inputFilename);

const gzipBenchmarkRunner = new CompressionBenchmarkRunner(inputStream, createGzip(), 'gz' );
const deflateBenchmarkRunner = new CompressionBenchmarkRunner(inputStream, createDeflate(), 'deflate');
const brotliBenchmarkRunner = new CompressionBenchmarkRunner(inputStream, createBrotliCompress(), 'br');


Promise.all([gzipBenchmarkRunner.run(), deflateBenchmarkRunner.run(), brotliBenchmarkRunner.run()])
  .then(([gzipResults, deflateResults, brotliResults]) => {
    const tabulator = new Tabulator(['Algorithm', 'Input size', 'Output size', 'Compression ratio', 'duration'], [gzipResults, deflateResults, brotliResults]);
    tabulator
      .buildTable()
      .display();
  });

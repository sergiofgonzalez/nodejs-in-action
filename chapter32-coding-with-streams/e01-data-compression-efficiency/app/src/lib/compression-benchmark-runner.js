import { StreamTimeMonitor } from './stream-time-monitor.js';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { getFileSize } from './get-file-size.js';

export class CompressionBenchmarkRunner {
  constructor(inputStream, compressionStream, marker) {
    this.inputStream = inputStream;
    this.compressionStream = compressionStream;
    this.marker = marker;
    this.outputStream = createWriteStream(`${ inputStream.path }.${ marker }`);
    this.streamTimeMonitor = new StreamTimeMonitor();
  }

  async run() {
    await pipeline(
      this.inputStream,
      this.streamTimeMonitor,
      this.compressionStream,
      this.outputStream
    );
    this.duration = this.streamTimeMonitor.getDuration();
    this.inputFileSize = await getFileSize(this.inputStream.path);
    this.outputFileSize = await getFileSize(this.outputStream.path);
    this.compressionRatio = (this.inputFileSize / this.outputFileSize).toFixed(2);

    return {
      marker: this.marker,
      inputFileSize: this.inputFileSize,
      outputFileSize: this.outputFileSize,
      compressionRatio: this.compressionRatio,
      duration: this.duration
    };
  }
}
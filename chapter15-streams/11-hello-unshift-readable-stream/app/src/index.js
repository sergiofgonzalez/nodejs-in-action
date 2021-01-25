"use strict";

const { Readable } = require("stream");
const { StringDecoder } = require("string_decoder");

const inputData = "This is the first line.This is the second line.This is the third line.";


class SourceStream extends Readable {

  constructor(charsPerChunk, inputData) {
    super();
    this.index = 0;
    this.charsPerChunk = charsPerChunk;
    this.inputData = inputData;
  }

  _read() {
    if (this.index > this.inputData.length) {
      return this.push(null);
    }
    const chunk = this.inputData.slice(this.index, this.index + this.charsPerChunk);
    this.index += this.charsPerChunk;
    this.push(chunk);
  }
}


const srcStream = new SourceStream(3, inputData);
const decoder = new StringDecoder("utf8");

srcStream.on("readable", onReadable);


function onReadable() {
  srcStream.removeListener("readable", onReadable);
  let chunk;
  while (null !== (chunk = srcStream.read())) {
    const str = decoder.write(chunk);
    const endOfSentenceIndex = str.indexOf(".");

    if (str.indexOf(".") === -1) {
      srcStream.unshift(chunk);
      console.log(`No whole line sentence was available: ${ decoder.write(chunk) }`);
    } else {
      const sentence = str.slice(0, endOfSentenceIndex + 1);
      const remaining = chunk.slice(endOfSentenceIndex + 1);
      const remStr = decoder.write(remaining);
      console.log(remStr);
      srcStream.unshift(remaining);
      console.log(`sentence = ${ sentence }`);
    }
  }
}

srcStream.on("end", () => {
  console.log("No more data available on the src stream");
});
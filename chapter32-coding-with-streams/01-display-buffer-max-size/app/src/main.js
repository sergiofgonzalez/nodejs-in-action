import buffer from 'buffer';

const maxBufferBytes = buffer.constants.MAX_LENGTH;
const maxBufferGiBs = maxBufferBytes / (2 ** 30);


console.log(`The maximum length of a buffer in this platform is: ${ maxBufferBytes } bytes (${ maxBufferGiBs } GiB)`);
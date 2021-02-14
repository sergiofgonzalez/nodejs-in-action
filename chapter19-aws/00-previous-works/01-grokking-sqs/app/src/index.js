'use strict';

const util = require('util');
const debug = require('debug')('sqs:index');
const { publish, listen } = require('./lib/sqs-client-callback');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

const messageAdditionalAttributes = {
  'Attribute1': {
    'DataType': 'String',
    'StringValue': 'This is the value for attribute 1. The type of the attribute is String'
  },
  'Attribute2': {
    'DataType': 'Number',
    'StringValue': '5'
  },
  'Attribute3': {
    'DataType': 'Binary',
    'BinaryValue': Buffer.from([0xAB, 0xCD, 0xEF])
  }
};

publish({ 
  delaySeconds: 10, 
  metadata: messageAdditionalAttributes, 
  payload: 'This is my message body. There are many like it, but this is mine.',
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/382027692032/messages'
}, (err, data) => {
  if (err) {
    return debug(`ERROR: could not write to the database: ${ util.inspect(err) }`);
  }
  debug(`Successfully published message to the queue: ${ util.inspect(data) }`);
});


listen({
  maxNumOfMessagesToRetrieve: 1,
  visibilityTimeoutSeconds: 45,
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/382027692032/messages',
  messageHandler: (messages, done) => {
    debug(`Consuming the message(s): ${ util.inspect(messages) }`);
    done();
  }
});

debug(`Listening to the queue and doing other things...`);

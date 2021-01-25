'use strict';

const AWS = require('aws-sdk');
const util = require('util');
const debug = require('debug')('sqs:client');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

const sqs = new AWS.SQS({ apiVersion: '2012-11-05', region: 'us-east-1', maxRetries: 10, sslEnabled: true });

let shouldStop = false;

function publish({ delaySeconds = 0, metadata = {}, payload, queueUrl }, cb) {
  const awsSqsSendMessageParams = {
    DelaySeconds: delaySeconds,
    MessageAttributes: metadata,
    MessageBody: payload,
    QueueUrl: queueUrl
  };

  sqs.sendMessage(awsSqsSendMessageParams, (err, data) => {
    if (err) {
      debug(`Error: could not send message to the queue: ${ util.inspect(err) }`);
      return cb(err);
    }
    debug(`Message successfully sent to the queue: ${ util.inspect(data) }`);
    cb(null, data);
  });
}

function listen({ maxNumOfMessagesToRetrieve = 1, visibilityTimeoutSeconds = 60, queueUrl, messageHandler }) {
  debug(`listening for messages on ${ queueUrl }`);

  const tryRetrieveMessageFromQueue = ({ maxNumOfMessagesToRetrieve, visibilityTimeoutSeconds, queueUrl, messageHandler }, done) => {
    const awsSqsReceiveMessageParams = {
      AttributeNames: [ 'SentTimestamp' ],
      MaxNumberOfMessages: maxNumOfMessagesToRetrieve,
      MessageAttributeNames: [ 'All' ],
      VisibilityTimeout: visibilityTimeoutSeconds,
      QueueUrl: queueUrl,
      WaitTimeSeconds: 20 /* why would i ever want to use a smaller value here? */
    };
    
    sqs.receiveMessage(awsSqsReceiveMessageParams, (err, receiveResult) => {
      if (err) {
        debug(`Error: could not receive message from the queue: ${ util.inspect(err) }`);
        done(err);
      }
      if ('Messages' in receiveResult) {
        const messages = receiveResult.Messages.map(message => {
          return message.Body;
        });
        messageHandler(messages.length === 1? messages[0] : messages, (err, handlerResult) => {
          if (err) {
            debug(`Error: the message handler reported an application error. Message will reappear in the queue shortly: ${ util.inspect(err) }`);          
            done(err);
          }
          const deleteMessageBatchParams = {
            Entries: receiveResult.Messages.map(message => {
              return {
                Id: message.MessageId,
                ReceiptHandle: message.ReceiptHandle
              };
            }),
            QueueUrl: queueUrl
          };
          sqs.deleteMessageBatch(deleteMessageBatchParams, (err, deleteResult) => {
            if (err) {
              debug(`Error: messages could not be deleted from the queue and will reappear shortly. This is probably unexpected as the messages were successfully consumed: ${ util.inspect(err) }`);
              done(err);
            }
            if (deleteResult.Failed.length > 0) {
              debug(`Error: at least one message could not be deleted from the queue and will reappear shortly. This is probably unexpected as the messages were successfully consumed: ${ util.inspect(err) }`);
              done(new Error(`could not delete messages from the queue`), handlerResult);
            }
            done(null, { numMessagesProcessed: receiveResult.Messages.length });
          });     
        });
      } else {
        done(null, { numMessagesProcessed: 0 });
      }
    });
  };


  tryRetrieveMessageFromQueue({ maxNumOfMessagesToRetrieve, visibilityTimeoutSeconds, queueUrl, messageHandler }, (err, result) => {
    if (err) {
      debug(`Error: could not complete listen activity for queue: ${ queueUrl }`);
    }
    debug(`Successfully completed listen activity for queue: ${ queueUrl }, ${ result.numMessagesProcessed } message(s) processed`);
    if (!shouldStop) {
      listen({ maxNumOfMessagesToRetrieve, visibilityTimeoutSeconds, queueUrl, messageHandler });
    } else {
      debug(`Stopping listening for new messages on queue: ${ queueUrl }`);
    }
  });
}

function stop() {
  debug(`Received signal to stop listening for messages on all registered queues. Messages in flight will still be processed`);
  shouldStop = true;
}

module.exports = {
  publish,
  listen,
  stop
};
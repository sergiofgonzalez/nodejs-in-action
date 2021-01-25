# 01-grokking-sqs

> publishing and consuming queue messages from *Amazon Simple Queue Service (SQS)* using a callback based library

## Description

This example illustrates a simple library defined on Amazon SQS. 

The library exposes three methods:
+ `publish` &mdash; Sends a message to the specified queue
+ `listen` &mdash; Register a function that will be applied to messages in a specific queue
+ `stop` &mdash; Stops listening for new messages in all previously configured queues


### `publish(paramsObject, cb)`

Use this method to publish messages on a specific SQS queue.

```javascript
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
```
The function expects the following parameters:
+ `paramsObject` &mdash; an object that tailors the function behavior:
  + `delaySeconds`: the number of seconds after which the message should be published to the queue (optional, default = 0)
  + `metadata`: an object with metadata attributes that will be bound to the message (optional). See example above.
  + `payload`: the contents of the message
  + `queueUrl`: the URL of the queue to which the message will be sent (required)
  + `messageHandler`: A function that will be called with the 
  + `cb` &mdash; a normalized Node.js callback function



### `listen(paramsObject)`
The function expects the following parameters:
+ `paramsObject` &mdash; an object that tailors the function behavior:
  + `maxNumOfMessagesToRetrieve`: maximum number of messages to retrieve (optional, default = 1)
  + `visibilityTimeoutSeconds`: number of seconds on which the message will disappear from the queue (optional, default=60)
  + `queueUrl`: the URL of the queue to which the message will be sent (required)
  + `messageHandler`: A function that will be called with the retrieved message(s). If only one message is retrieved, a single value will be sent `messageHandler(messageContents)` while if several messages are retrieved an array will be passed to the handler `messageHandler([messageContentsArray])`.  
+ `cb` &mdash; a normalized Node.js callback function

The function relies on the [*long-polling*](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-long-polling.html) capabilities of SQS to minimize the number of API calls when there are no messages available. 

Note also that this function will retrieve messages undefinitely until `stop` is called.

### `stop()`
Disables all current listening processes while allowing the current in flight messages to be processed.

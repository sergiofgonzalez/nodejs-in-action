import { createPostStatusCmd } from './lib/create-post-status-cmd.js';
import { statusUpdateService } from './lib/status-update-service.js';
import { Invoker } from './lib/invoker.js';

const invoker = new Invoker();

const command = createPostStatusCmd(statusUpdateService, 'Hi!');

// Execute immediately, using the command
invoker.run(command);

// Revert
invoker.undo(command);

// Schedule the message to be executed in 2 seconds from now
invoker.delay(command, 2000);

// Run the command on a remote server
invoker.runRemotely(command);

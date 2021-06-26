import { BroadcastService, EventKeys } from './lib/event-bus';
import { Listener } from './lib/listener';

const broadcastService = new BroadcastService();

const listenerOne = new Listener(
  broadcastService,
  EventKeys.ALL,
  'first'
);

const listenerTwo = new Listener(
  broadcastService,
  EventKeys.SINGLE,
  'second'
);

broadcastService.broadcast(EventKeys.ALL, 'ALL event broadcast');
broadcastService.broadcast(EventKeys.SINGLE, 'SINGLE event broadcast');

listenerOne.unregister();
broadcastService.broadcast(EventKeys.ALL, 'ALL event broadcast #2');

listenerTwo.unregister();
broadcastService.broadcast(EventKeys.ALL, 'ALL event broadcast #3');
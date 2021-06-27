import { BroadcastService, EventType } from './lib/event-bus';
import { Listener } from './lib/listener';

const broadcastService = new BroadcastService();

const listenerOne = new Listener(
  broadcastService,
  EventType.ALL,
  (eventData: string) => console.log(`\tprocessing received event with data: '${ eventData }'`),
  'first'
);

const listenerTwo = new Listener(
  broadcastService,
  'greet',
  (eventData: string) => console.log(`\tHello to ${ eventData ?? 'stranger' }!`),
  'second'
);

broadcastService.broadcast(EventType.ALL, 'ALL event broadcast');
broadcastService.broadcast('greet', 'Hello to Jason Isaacs!');

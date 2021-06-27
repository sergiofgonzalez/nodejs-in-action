import { Subscription } from 'rxjs';
import { BroadcastService, EventKey } from './event-bus';
import * as _ from 'underscore';

export class Listener {
  private eventSubscription: Subscription;

  constructor(
    broadcastService: BroadcastService,
    public eventKey: EventKey,
    private eventHandler: (eventData: string) => void,
    private listenerName: string
  ) {
    _.bindAll(this, 'eventHandlerWrapper');
    this.eventSubscription = broadcastService.on(eventKey).subscribe(this.eventHandlerWrapper);
  }

  private eventHandlerWrapper(event: string) {
    console.log(`Listener [${ this.listenerName }] received event with data: '${ event }'`);
    this.eventHandler.call(this, event);
  }

  public unregister(): void {
    this.eventSubscription.unsubscribe();
  }
}
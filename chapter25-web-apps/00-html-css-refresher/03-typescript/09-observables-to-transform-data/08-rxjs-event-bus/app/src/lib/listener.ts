import { Subscription } from 'rxjs';
import { BroadcastService, EventKeys } from './event-bus';
import * as _ from 'underscore';

export class Listener {
  private eventSubscription: Subscription;

  constructor(
    broadcastService: BroadcastService,
    eventKey: EventKeys,
    private listenerName: string
  ) {
    _.bindAll(this, 'reactToEvent');
    this.eventSubscription = broadcastService.on(eventKey).subscribe(this.reactToEvent);
  }

  private reactToEvent(event: string) {
    console.log(`Listener [${ this.listenerName }] received event: ${ event }`);
  }

  public unregister(): void {
    this.eventSubscription.unsubscribe();
  }
}
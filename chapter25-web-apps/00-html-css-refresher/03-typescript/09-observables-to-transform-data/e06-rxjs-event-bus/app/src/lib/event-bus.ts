import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export enum EventType {
  ALL = 'all-events',
  SINGLE = 'single-event'
}

export type EventKey = EventType | string;

export interface IBroadcastEvent {
  key: EventKey;
  data: string;
}

export class BroadcastService {
  private _eventBus = new Subject<IBroadcastEvent>();

  on(key: EventKey): Observable<string> {
    return this._eventBus.asObservable().pipe(
      filter(
        event => event.key === key || key === EventType.ALL
      ),
      map(event => event.data)
    );
  }

  broadcast(key: EventKey, data: string): void {
    this._eventBus.next({ key, data });
  }
}
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export enum EventKeys {
  ALL = 'all-events',
  SINGLE = 'single-event'
}

export interface IBroadcastEvent {
  key: EventKeys;
  data: string;
}

export class BroadcastService {
  private _eventBus = new Subject<IBroadcastEvent>();

  on(key: EventKeys): Observable<string> {
    return this._eventBus.asObservable().pipe(
      filter(
        event => event.key === key || event.key === EventKeys.ALL
      ),
      map(event => event.data)
    );
  }

  broadcast(key: EventKeys, data: string): void {
    this._eventBus.next({ key, data });
  }
}
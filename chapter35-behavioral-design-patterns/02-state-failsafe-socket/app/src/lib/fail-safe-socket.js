import { OfflineState } from './states/offline-state.js';
import { OnlineState } from './states/online-state.js';

export class FailsafeSocket {

  constructor(options) {
    this.options = options;
    this.queue = [];
    this.currentState = null;
    this.socket = null;
    this.states = {
      offline: new OfflineState(this),
      online: new OnlineState(this)
    };
    this.changeState('offline');
  }

  changeState(state) {
    console.log(`INFO: FailsafeSocket: Activating state: ${ state }`);
    this.currentState = this.states[state];
    this.currentState.activate();
  }

  send(data) {
    this.currentState.send(data);
  }
}
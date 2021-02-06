export class OnlineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
    this.hasDisconnected = false;
  }

  send(data) {
    this.failsafeSocket.queue.push(data);
    this._safeWrite(data);
  }

  _safeWrite(data) {
    this.failsafeSocket.socket.write(data, err => {
      if (!this.hasDisconnected && !err) {
        this.failsafeSocket.queue.shift();
      } else {
        const error = this.hasDisconnected ? new Error('Unexpected disconnection') : err;
        this._handleError(error);
      }
    });
  }

  activate() {
    this.hasDisconnected = false;
    for (const data of this.failsafeSocket.queue) {
      this._safeWrite(data);
    }

    this.failsafeSocket.socket.once('error', error => {
      this._handleError(error);
    });
  }

  _handleError(err) {
    console.error(`ERROR: OnlineState: ${ err.message }: switching to offline mode`);
    this.hasDisconnected = true;
    this.failsafeSocket.changeState('offline');
  }
}
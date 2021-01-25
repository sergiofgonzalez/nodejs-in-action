import getColorForValue from '../services/get-color-for-value.js';

class AppState {
  constructor() {
    console.log(`Building AppState instance`);
    this.counter = 0;
    this.color = '';
  }

  inc() {
    ++this.counter;
    this.color = getColorForValue(this.counter);
  }

  dec() {
    --this.counter;
    this.color = getColorForValue(this.counter);
  }

  reset() {
    this.counter = 0;
    this.color = getColorForValue(this.counter);
  }
}

const appState = new AppState();


export default appState;
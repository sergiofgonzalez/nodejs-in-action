import getRandomColorFromList from '../services/get-random-color-from-list.js';
import getRandomHexColor from '../services/get-random-hex-color.js';

const initialBackgroundColor = '#f1f5f8';

class AppState {
  constructor() {
    console.log(`Building AppState instance`);
    this.mode = 'simple';
    this.backgroundColor = initialBackgroundColor;
    this.backgroundColors = [ '#f15025', 'green', 'red', 'rgba(133, 122, 200)', 'hsl(205, 78%, 60%)' ];
    this.validModes = new Set();
    this.validModes.add('simple');
    this.validModes.add('hex');
  }

  set appMode(mode) {
    if (!this.validModes.has(mode.toLowerCase())) {
      console.log(`ERROR: AppState : ${ mode } is not recognized as a valid mode; expected : ${ this.validModes }`);
      throw new Error('Invalid Arguments');
    }

    if (this.mode == mode) {
      return;
    } else {
      this.mode = mode.toLowerCase();
      this.resetToInitialColor();
    }

    console.log(`INFO: AppState: appMode switched to ${ this.mode }`);
  }

  get appMode() {
    return this.mode;
  }

  switchColor() {
    this.mode == 'simple' ? this.backgroundColor = getRandomColorFromList(this.backgroundColors) : this.backgroundColor = getRandomHexColor();
  }

  resetToInitialColor() {
    this.backgroundColor = initialBackgroundColor;
  }
}

const appState = new AppState();


export default appState;
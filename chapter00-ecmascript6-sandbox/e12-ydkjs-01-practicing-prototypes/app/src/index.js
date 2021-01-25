'use strict';

/**
 * Returns a random integer up to max (exclusive)
 * @param {Number} max 
 * @returns {Number}
 */
function randMax(max) {
  return Math.trunc(1E9 * Math.random()) % max;
}

const reel = {
  symbols: ['♠', '♥', '♦', '♣', '☺', '★', '☾', '☀'],
  spin() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    this.position =(this.position + 100 + randMax(100)) % this.symbols.length;
  },
  display() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length);
    }
    return this.symbols[this.position];
  }
};


const slotMachine = {
  reels: [Object.create(reel), Object.create(reel), Object.create(reel)],
  spin() {
    this.reels.forEach(reel => reel.spin());
  },
  display() {
    const rowSymbols = { top: [], middle: [], bottom: [] };
    for (let i = 0; i < this.reels.length; i++) {
      rowSymbols.middle.push(this.reels[i].display());
      rowSymbols.bottom.push(this.reels[i].symbols[(this.reels[i].position + 1) % this.reels[i].symbols.length]);
      rowSymbols.top.push(this.reels[i].position == 0 ? this.reels[i].symbols[this.reels[i].symbols.length - 1] : this.reels[i].symbols[this.reels[i].position - 1]);
    }    
    return [rowSymbols.top.join(' | '), rowSymbols.middle.join(' | '), rowSymbols.bottom.join(' | ')].join('\n');
  }
};

slotMachine.spin();
console.log(slotMachine.display());
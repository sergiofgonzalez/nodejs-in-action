"use strict";

function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

class Currency {
  constructor(eurToRupeesConversionRate) {
    this.eurToRupeesConversionRate = eurToRupeesConversionRate;
  }

  eurToRupees(eurAmount) {
    return roundTwoDecimals(eurAmount * this.eurToRupeesConversionRate);
  }

  rupeesToEur(rupeesAmount) {
    return roundTwoDecimals(rupeesAmount * (1 / this.eurToRupeesConversionRate));
  }
}

/* 
  Exporting a single object
  As exports cannot be reassigned, you cannot do exports = Currency
 */
module.exports = Currency;

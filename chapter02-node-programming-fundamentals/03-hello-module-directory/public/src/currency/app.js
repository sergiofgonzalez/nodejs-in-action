"use strict";

function Currency(eurToRupeesConversionRate) {
  this.eurToRupeesConversionRate = eurToRupeesConversionRate;
}

Currency.prototype.eurToRupees = function (eurAmount) {
  return roundTwoDecimals(eurAmount * this.eurToRupeesConversionRate);
};

Currency.prototype.rupeesToEur = function (rupeesAmount) {
  return roundTwoDecimals(rupeesAmount * (1 / this.eurToRupeesConversionRate));
};

function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

/* exporting a single object */
module.exports = Currency;

"use strict";

var eurToRupeeConversionRate = 74.99;

function roundToTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

/*
 * We need to return two functions, so we use `exports` object to make them
 * available to the consumers.
 * 
 * exports cannot be reassigned, but you can add functions, objects and values to it
*/

exports.eurToRupees = function (eurAmount) {
  return roundToTwoDecimals(eurAmount * eurToRupeeConversionRate);
};

exports.rupeesToEur = function (rupeesAmount) {
  return roundToTwoDecimals(rupeesAmount * (1/eurToRupeeConversionRate));
};

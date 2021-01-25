"use strict";

var Currency = require("./currency");

var CurrencyConversor = new Currency(74.99);




/* now, as it's an object we can create several instances */
var CurrencyConversorForToday = new Currency(74.44);


console.log("==== YESTERDAY");
console.log("Converting 1 Eur to INR  : ", CurrencyConversor.eurToRupees(1));
console.log("Converting 100 INR to Eur: ", CurrencyConversor.rupeesToEur(100));

console.log("==== TODAY");
console.log("Converting 1 Eur to INR  : ", CurrencyConversorForToday.eurToRupees(1));
console.log("Converting 100 INR to Eur: ", CurrencyConversorForToday.rupeesToEur(100));

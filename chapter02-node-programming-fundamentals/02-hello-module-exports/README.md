# 02-hello-module-exports
> exposing a single object with module.exports

## Description
A module `currency.js` is created to convert from Euros to Rupees and vice versa. Instead of exposing the conversion functions, the Conversor is now designed as a class with functions to convert from one currency to the other.

In order to expose the object, the `module.exports` object is used:
```javascript
function Currency(eurToRupeesConversionRate) {
  this.eurToRupeesConversionRate = eurToRupeesConversionRate;
}
...

module.exports = Currency;
```


Then, the client can use the module using require and creating a new instance:

```javascript
var CurrencyConversor = new Currency(74.99);

var rupees = CurrencyConversor.eurToRupees(1);
var eur = CurrencyConversor.rupeesToEur(100);
```

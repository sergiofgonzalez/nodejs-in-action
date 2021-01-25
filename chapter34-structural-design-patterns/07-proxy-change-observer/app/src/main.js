import { createObservable } from './lib/create-observable.js';

function calculateTotal(invoice) {
  return invoice.subtotal - invoice.discount + invoice.tax;
}

const invoice = {
  subtotal: 100,
  discount: 10,
  tax: 20
};

let total = calculateTotal(invoice);
console.log(`Starting total: ${ total }`);

const observableInvoice = createObservable(invoice, ({ prop, prev, curr }) => {
  total = calculateTotal(invoice);
  console.log(`TOTAL: ${ total } (${ prop } changed: ${ prev } => ${ curr })`);
});

observableInvoice.subtotal = 200; // subtotal updated
observableInvoice.discount = 20;  // discount updated
observableInvoice.discount = 20;  // no change: smart change detection!
observableInvoice.tax = 15;       // tax updated
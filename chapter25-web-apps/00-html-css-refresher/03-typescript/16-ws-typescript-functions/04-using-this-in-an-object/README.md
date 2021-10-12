# 04: TypeScript functions &mdash; Using `this` in an object
> Illustrates the use of `this` in object literals with properties and methods by creating an `account` object literal to model the status of a debt.

## Exercise 3.04

In this exercise you are dealing with an accounting application. In this software, each account object tracks the total amount due, along with the amount that has been paid. A couple of utility methods are defined in the object to get the current state of the account, and the balance that needs to be paid.

1. Create an object with the following shape:
  + `due` &mdash; the amount of money that needs to be paid to settle the debt.
  + `paid` &mdash; the amount of money that has been paid.
  + `status` &mdash; `'OPEN'` if the due amount is greater than what has been paid; `'CLOSED'` if the debt has been settled.
  + `payAccount(...)` &mdash; object method that receives as argument an amount of money to be paid and returns a string with the status of the account.
  + `printStatus()` &mdash; object method that receives no arguments and returns a string with the current status of the account (whether it's settled or not, etc.)

2. Implement the following simple sequence of calls that demonstrates the usual workflow for an account:
  1. Print the initial status of the account.
  2. Pay $1500 (more than what's due)
  3. Pay $500
  4. Pay $100
  5. Pay $400

3. Implement the `payAccount(...)` method with the following behavior:
  + if the amount received is greater than the current debt (paid - due) return an string indicating that the amount could not be processed.
  + Otherwise, process the payment.
  + Check if the debt has been settled. If so, change the status of the account to `'CLOSED'`.
  + In any case, show a message with the current status of the account.

4. Implement the `printStatus()` method with the following behavior:
  + show a message indicating, the amount of money that has been paid, how much debt is outstanding, and the status of the account.
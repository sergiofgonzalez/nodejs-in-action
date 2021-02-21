import { createStack } from './stack.js';

export class CalcStack {
  constructor() {
    this.stack = createStack();
  }

  enter(input) {
    const num = Number(input);
    this.stack.push(!isNaN(num) ? num : input);
  }

  add() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 + op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  sub() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 + op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  mult() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 * op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  div() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 / op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  neg() {
    try {
      const op1 = this.getOperandForUnaryOperation();
      this.stack.push(-op1);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  sqrt() {
    try {
      const op1 = this.getOperandForUnaryOperation();
      this.stack.push(Math.sqrt(op1));
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  pow() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 ** op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  mod() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 % op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  swap() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op2);
      this.stack.push(op1);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  getOperandsForBinaryOperation() {
    let op1, op2;
    if (this.stack.isEmpty()) {
      throw new Error(`not enough arguments`);
    } else {
      op2 = this.stack.pop();
    }

    if (this.stack.isEmpty()) {
      this.stack.push(op2);
      throw new Error(`not enough arguments`);
    } else {
      op1 = this.stack.pop();
    }
    return { op1, op2 };
  }

  getOperandForUnaryOperation() {
    let op1;
    if (this.stack.isEmpty()) {
      throw new Error(`not enough arguments`);
    } else {
      op1 = this.stack.pop();
    }

    return op1;
  }

  toString() {
    return this.stack.toString();
  }

}
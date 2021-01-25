export const safeCalculatorHandler = {
  get: (target, property) => {
    if (property === 'divide') {
      /* proxied method */
      return function () {
        const divisor = target.peekValue();
        if (divisor === 0) {
          throw new Error('Division by zero');
        }
        return target.divide();
      };
    }

    /* delegated methods and properties */
    return target[property];
  }
};
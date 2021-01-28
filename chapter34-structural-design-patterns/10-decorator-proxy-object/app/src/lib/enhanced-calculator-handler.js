
export const enhancedCalculatorHandler = {
  get(target, property) {
    /* new method */
    if (property === 'add') {
      return function add() {
        const addend2 = target.getValue();
        const addend1 = target.getValue();
        const result = addend1 + addend2;
        target.putValue(result);
        return result;
      };
    } else {
      /* modified method */
      if (property === 'divide') {
        return function () {
          const divisor = target.getValue();
          if (divisor === 0) {
            throw new Error('Division by 0');
          }
          // delegate if not dividing by zero
          return target.divide();
        };
      }
    }

    /* delegated methods */
    return target[property];
  }
};


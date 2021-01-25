export function patchCalculator(calculator) {
  /* new method */
  calculator.add = () => {
    const addend2 = calculator.getValue();
    const addend1 = calculator.getValue();
    const result = addend1 + addend2;
    calculator.putValue(result);
    return result;
  };

  /* modified method */
  const originalDivide = calculator.divide;
  calculator.divide = () => {
    const divisor = calculator.peekValue();
    if (divisor === 0) {
      throw Error('Division by 0');
    }

    return originalDivide.apply(calculator);
  };

  return calculator;
}
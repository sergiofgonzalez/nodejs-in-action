export function patchToSafeCalculator(calculator) {
  const divideOriginal = calculator.divide;
  calculator.divide = () => {
    const divisor = calculator.peekValue();
    if (divisor === 0) {
      throw new Error('Division by 0');
    }
    return divideOriginal.apply(calculator);
  };
  return calculator;
}
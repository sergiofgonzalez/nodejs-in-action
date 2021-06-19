// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function perfCounter(target: any, methodName: string, descriptor?: PropertyDescriptor): any {
  const originalFn = target[methodName];
  const newFn = function (this: any) {
    const startTime = process.hrtime.bigint();
    console.log(`${methodName}: called (${startTime})`);
    // eslint-disable-next-line prefer-rest-params
    const result = originalFn.apply(this, arguments);
    console.log(`${methodName}: done (${(process.hrtime.bigint() - startTime) / 1_000_000n} ms)`);
    return result;
  };
  target[methodName] = newFn;
  return target;
}
const privates = new WeakMap();

export class Car {
  constructor(make, model, year) {
    const me = {
      make,
      model,
      year
    };
    privates.set(this, me);

  }

  toString() {
    const me = privates.get(this);
    return `${ me.make }: ${ me.model } (${ me.year })`;
  }
}
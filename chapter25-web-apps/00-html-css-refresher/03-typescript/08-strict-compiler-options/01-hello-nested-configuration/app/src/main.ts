// eslint-disable-next-line @typescript-eslint/ban-types
function classDecorator(constructor: Function) {
  constructor.prototype.addedProperty = 'added property value';
}


@classDecorator
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyDecoratedClass {
  constructor(public id: number) { }
}
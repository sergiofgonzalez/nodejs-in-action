function PropertyDecorator(message: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any, propertyKey: string) {
    console.log(`${ target.constructor.name }.${ propertyKey } decorated with ${ message }`);
  };
}

class Teacher {

  @PropertyDecorator('ID')
  id: number;

  @PropertyDecorator('NAME')
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

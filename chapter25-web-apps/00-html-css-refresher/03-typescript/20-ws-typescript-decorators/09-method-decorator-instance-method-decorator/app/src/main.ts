class Teacher {
  private _title = '';

  constructor(public name: string) {}

  @Enumerable(true)
  public get title() {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  @Enumerable(true)
  public teach() {
    console.log(`${ this.name } is teaching`);
  }
}

const teacher = new Teacher('Miyagi');

for (const objectProperty in teacher) {
  console.log(objectProperty);
}

function Enumerable(isEnumerable: boolean) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = isEnumerable;
  };
}
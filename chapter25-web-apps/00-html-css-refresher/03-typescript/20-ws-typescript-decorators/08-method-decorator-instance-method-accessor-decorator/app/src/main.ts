class Teacher {
  private _title = '';

  //@MethodDecorator //ERR: you should use a class decorator instead
  constructor(public name: string) {}

  @MethodDecorator
  public get title() {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  @MethodDecorator
  public teach() {
    console.log(`${ this.name } is teaching`);
  }
}

function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`Target is`, target);
  console.log(`Property name is`, propertyKey);
  console.log(`Descriptor is`, descriptor);
}


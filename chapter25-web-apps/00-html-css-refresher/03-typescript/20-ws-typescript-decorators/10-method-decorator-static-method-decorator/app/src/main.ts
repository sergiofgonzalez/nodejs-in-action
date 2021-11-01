class Teacher {
  private _title = '';

  constructor(public name: string) {}

  public get title() {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public teach() {
    console.log(`${ this.name } is teaching`);
  }

  @MethodDecorator
  public static showUsage() {
    console.log(`This is the 'Teacher' class`);
  }
}

function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`Target is`, target);
  console.log(`Property name is`, propertyKey);
  console.log(`Descriptor is`, descriptor);
}


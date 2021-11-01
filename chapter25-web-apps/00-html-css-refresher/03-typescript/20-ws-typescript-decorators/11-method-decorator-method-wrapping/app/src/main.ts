const logger = {
  info: (message: string) => console.log(`[INFO]`, message)
};

class Teacher {
  private _title = '';

  constructor(public name: string) {}

  @LoggerDecorator(`'title' property`)
  public get title() {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  @LoggerDecorator(`'teach()' instance method`)
  public teach() {
    console.log(`${ this._title?? '' } ${ this.name } is teaching`);
  }

  @LoggerDecorator(`'showUsage()' static function`)
  public static showUsage() {
    console.log(`This is the 'Teacher' class`);
  }
}

const teacher = new Teacher('Miyagi');
teacher.teach();
teacher.title = 'Mr.';

console.log(`${ teacher.title } ${ teacher.name } is my fave teacher`);
Teacher.showUsage();



function LoggerDecorator(message: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (descriptor.value) {
      const original = descriptor.value;
      descriptor.value = function (...args: any[]) {
        logger.info(`method: '${ propertyKey }': ${ message }`);
        return original.apply(this, args);
      };
    }
    if (descriptor.get) {
      const original = descriptor.get;
      descriptor.get = function () {
        logger.info(`get '${ propertyKey }': ${ message }'`);
        return original.apply(this, []);
      };
    }
    if (descriptor.set) {
      const original = descriptor.set;
      descriptor.set = function (value: any) {
        logger.info(`set '${ propertyKey }': ${ message }`);
        return original.apply(this, [value]);
      };
    }
  };
}


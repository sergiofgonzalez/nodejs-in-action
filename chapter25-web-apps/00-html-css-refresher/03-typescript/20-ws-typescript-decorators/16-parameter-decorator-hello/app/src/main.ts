// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ParameterDecorator(target: any, propertyName: string, parameterIndex: number) {
  console.log(`Target is:`, target);
  console.log(`Property name is: `, propertyName);
  console.log(`Parameter index is:`, parameterIndex);
}

class Teacher {
  id: number;
  name: string;

  constructor(id: number, @ParameterDecorator name: string) {
    this.id = id;
    this.name = name;
  }

  getFullName(title: string, suffix: string) {
    return `${ title } ${ this.name }, ${ suffix }`;
  }
}


import 'reflect-metadata';

class Teacher {

  @Description('This is the id of the teacher')
  id: number;

  @Description('This is the full name of the teacher')
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

function Description(description: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any, propertyKey: string) {
    console.log(`registering description for ${ propertyKey }`);
    Reflect.defineMetadata('description', description, target, propertyKey);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showDescriptions(target: any) {
  for (const propertyKey in target) {
    if (Reflect.hasMetadata('description', target, propertyKey)) {
      const description = Reflect.getMetadata('description', target, propertyKey);
      console.log(`${ propertyKey }: ${ description }`);
    }
  }
}

const teacher = new Teacher(1, 'Margot Robbie');
showDescriptions(teacher);

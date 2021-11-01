import 'reflect-metadata';

class Teacher {
  #title = '';

  constructor(public name: string) {
    if (Reflect.hasMetadata('instance-count', Teacher)) {
      const currValue = Reflect.getMetadata('instance-count', Teacher);
      Reflect.defineMetadata('instance-count', currValue + 1, Teacher);
    }
  }

  get title() {
    return this.#title;
  }

  set title(value: string) {
    this.#title = value;
  }

  teach() {
    // increment the call-count at the class level
    if (Reflect.hasMetadata('call-count', Teacher, 'teach')) {
      const currValue = Reflect.getMetadata('call-count', Teacher, 'teach');
      Reflect.defineMetadata('call-count', currValue + 1, Teacher, 'teach');
    }

    // increment the call-count at the instance level
    if (Reflect.hasMetadata('call-count', this, 'teach')) {
      const currValue = Reflect.getMetadata('call-count', this, 'teach');
      Reflect.defineMetadata('call-count', currValue + 1, this, 'teach');
    } else {
      Reflect.defineMetadata('call-count', 1, this, 'teach');
    }

    console.log(`${ this.name } is teaching`);
  }
}

Reflect.defineMetadata('instance-count', 0, Teacher);
Reflect.defineMetadata('call-count', 0, Teacher, 'teach');

const teacher1 = new Teacher('Jason Isaacs');
teacher1.teach();

const teacher2 = new Teacher('Idris Elba');

const teacher3 = new Teacher('Florence Pugh');
teacher3.teach();
teacher3.teach();

// printing the instance count at the class level
if (Reflect.hasMetadata('instance-count', Teacher)) {
  const instanceCountValue = Reflect.getMetadata('instance-count', Teacher);
  console.log(`Teacher instances: `, instanceCountValue);
}

// printing the teach() call count at the class level
if (Reflect.hasMetadata('call-count', Teacher, 'teach')) {
  const callCountValue = Reflect.getMetadata('call-count', Teacher, 'teach');
  console.log(`Times 'teach()' has been called: `, callCountValue);
}

// printing the teach() call count at the instance level
if (Reflect.hasMetadata('call-count', teacher1, 'teach')) {
  const callCountValue = Reflect.getMetadata('call-count', teacher1, 'teach');
  console.log(`Times 'teach()' has been called on teacher1: `, callCountValue);
}

if (Reflect.hasMetadata('call-count', teacher2, 'teach')) {
  const callCountValue = Reflect.getMetadata('call-count', teacher2, 'teach');
  console.log(`Times 'teach()' has been called on teacher2: `, callCountValue);
} else {
  console.log(`'teach()' has not been called on teacher2`);
}

if (Reflect.hasMetadata('call-count', teacher3, 'teach')) {
  const callCountValue = Reflect.getMetadata('call-count', teacher3, 'teach');
  console.log(`Times 'teach()' has been called on teacher3: `, callCountValue);
} else {
  console.log(`'teach()' has not been called on teacher3`);
}

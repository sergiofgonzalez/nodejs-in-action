/* Record: define the shape of an entry in a key-value map */
const serviceConfigParameters: Record<string, string | number | boolean> = {
  port: 3000,
  redirectUrl: 'http://localhost/app',
  verboseLogging: true
};

// you can make it even more type safe using literal types:

type ServiceConfigParams = 'port' | 'redirectUrl' | 'verboseLogging' | 'enableSso';

const configParams: Record<ServiceConfigParams, string | number | boolean> = {
  port: 5000,
  redirectUrl: 'http://localhost',
  verboseLogging: false,
  enableSso: true  // this has to be included
};


/*
  Partial: creates type with the same properties of another one
  in which all the properties are marked as optional
*/

enum PRIORITY {
  DEFAULT,
  LOW,
  HIGH
}

interface TodoItemProps {
  title: string;
  description: string;
  priority: PRIORITY;
}

class TodoItem {
  description?: string;
  title = 'Default item title';
  priority = PRIORITY.DEFAULT;

  constructor(todoItemProps: Partial<TodoItemProps> = {}) {
    Object.assign(this, todoItemProps);
  }
}


const item = new TodoItem({ description: 'TodoItem description' });
console.log(item.description);
console.log(item.title);

/*
  Required: creates type with the same properties of another one
  in which all the properties are marked as required
*/

type Person = {
  name: string;
  age?: number;
}

const p1: Person = { name: 'Jason Isaacs'};
// const p2: Required<Person> = { name: 'Idris Elba' }; // ERR: property age is missing

/*
  Pick: creates a type out of specific properties of an existing one
*/

interface MyComponent {
  onclick: () => void;
  onload: () => void;
  onsubmit: () => void;
  onkeypress: () => void;
  onfocus: () => void;
  className: string;
  isActive: boolean;
  // ...
}

type ButtonProps = Pick<MyComponent, 'className' | 'isActive' | 'onclick'>;

const myButtonProps: ButtonProps = {
  className: 'primary',
  isActive: true,
  onclick: () => console.log(`Button has been clicked!`)
};

/*
  Omit: creates a type with all the properties of an existing one, except for the ones specified.
*/

type OriginalThemeProps = {
  colors: string[],
  elevations: string[],
  margins: string[],
  defaultTypography: string;
}

type CustomThemeProps = {
  color: Set<string>;
}

type ThemeProps = Omit<OriginalThemeProps, 'colors'> & { colors?: CustomThemeProps };

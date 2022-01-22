/* abstraction: hide implementation details from class consumers */

// interfaces is given to class consumer hiding implementation details
interface RestApiClient<T> {
  getAll(): Promise<T[]>;
  getOne(id: string): Promise<T>
}

interface Site {
  name: string;
}

// The actual implementation can be hidden from the class consumer
class SiteApiClient implements RestApiClient<Site> {
  getAll(): Promise<Site[]> {
      const result: Site[] = [{ name: 'website1'}, { name: 'website2'}];
      return Promise.resolve(result);
  }

  getOne(id: string): Promise<Site> {
      const result: Site = { name: `website_${ id }` };
      return Promise.resolve(result);
  }
}

// consumer view
const siteService = new SiteApiClient();
siteService.getAll()
  .then((data) => console.log(data));

siteService.getOne('123FE')
  .then((data) => console.log(data));

/* inheritance: extend or augment existing objects using subclassing */
class EventAction {
  trigger(delay: number = 0) {
    setTimeout(() => {
      console.log(`INFO: Event triggered after ${ delay } second(s)`);
    }, delay * 1_000);
  }
}

// we subclass EventAction to augment it with an additional method
class NotificationEvent extends EventAction {
  sendEmail() {
    console.log(`Sending email...`);
  }
}

const evt = new NotificationEvent();
evt.trigger();
evt.sendEmail();
evt.trigger(3);

/* Runtime hack to prevent subclassing */
class A {
  constructor() {
    this.subClassCheck();
    console.log(`A class instantiated`);

  }

  private subClassCheck(): never | void {
    if (Object.getPrototypeOf(this) !== A.prototype) {
      throw new Error(`This class cannot be extended`);
    }
  }
}

const a: A = new A(); // this is fine

class B extends A {}
try {
  const b: B = new B();
} catch (err) {
  console.error(`ERROR:`, (err as Error).message);
}


/* Encapsulation: hide certain data and operations inside objects */
class User {
  #name: string;
  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    console.log(`Hello, ${ this.#name }`);

  }
}

const user = new User('Jason Isaacs');
user.greet();

/* Polymorphism */
class Component {
  onInit(): void {
    console.log(`Component.onInit()`);
  }
}

class ReactComponent extends Component {
  onInit(): void {
    console.log(`ReactComponent.onInit()`);
  }
}

class AngularComponent extends Component {
  onInit(): void {
    console.log(`AngularComponent.onInit()`);
  }
}

class VueComponent extends Component {
  onInit(): void {
    super.onInit();
    console.log(`VueComponent.onInit()`);
  }
}


const components: Component[] = [
  new Component(),
  new ReactComponent(),
  new AngularComponent(),
  new VueComponent()
];

for (const component of components) {
  component.onInit();
}
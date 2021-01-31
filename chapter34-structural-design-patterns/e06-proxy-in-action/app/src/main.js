const target = {
  message1: 'Hello',
  message2: 'world'
};

const proxy = new Proxy(target, {
  // eslint-disable-next-line no-unused-vars
  get: function (target, prop, receiver) {
    if (prop === 'message2') {
      return 'to Jason Isaacs!';
    }
    return target[prop];
  }
});

console.log(proxy.message1);
console.log(proxy.message2);

/* alternative implementation using `Reflect`: it's not that clear */
const proxy2 = new Proxy(target, {
  // eslint-disable-next-line no-unused-vars
  get: function (target, prop, receiver) {
    if (prop === 'message2') {
      return 'to Jason Isaacs!';
    }
    return Reflect.get(...arguments);
  }
});

console.log(proxy2.message1);
console.log(proxy2.message2);


/* use cases */

/*
  Use case 0: No-op forwarding proxy
  No-op forwarding proxy: works as a pass-through to the target object
  By assigning a value to the proxy, you will be assigning a value
  to the target
*/

function useCase0() {
  const target = {};
  const handler = {};
  const proxy = new Proxy(target, handler);

  proxy.prop = 5;

  console.log(`proxy.prop:`, proxy.prop);
  console.log(`target.prop:`, target.prop);
  console.log(`=============================`);
}
useCase0();

/*
  Use case 1: Trapping set and get to control access
  No-op forwarding proxy: works as a pass-through to the target object
  By assigning a value to the proxy, you will be assigning a value
  to the target
*/

function useCase1() {
  const target = {
    _hidden: 55,
    greeting: 'hello',
    sayHello: () => console.log(target.greeting)
  };

  const proxy = new Proxy(target, {
    get: (target, property) => {
      if (property.startsWith('_')) {
        throw new Error('Unauthorized access to internal variable');
      }
      return target[property];
    },
    set: (target, property, value) => {
      if (property.startsWith('_')) {
        throw new Error('Unauthorized attempt to write internal variable');
      }
      return target[property] = value;
    }
  });

  proxy.greeting = 'Hello to Jason Isaacs!';
  proxy.sayHello();
  console.log(`=============================`);
}
useCase1();


/*
  Use case 2: using the has() trap

  handler.has lets you implement logic associated to `in` operations
  You should return true or false to signal whether the property is accessible or not
*/
function useCase2() {
  const target = {
    _hidden: 'foo',
    exposed: 'bar'
  };

  const proxy = new Proxy(target, {
    has: (target, property) => {
      if (property.startsWith('_')) {
        return false;
      } else {
        return true;
      }
    },
    // eslint-disable-next-line no-unused-vars
    enumerate: (target) => {
      const keys = target.keys.filter((key) => {
        if (!key.startsWith('_')) {
          return key;
        }
      });
      return keys;
    }
  });

  /* prop in obj works */
  console.log(`'_hidden' in proxy:`, '_hidden' in proxy);
  console.log(`'exposed' in proxy:`, 'exposed' in proxy);

  /* but for (prop in obj) doesn't */
  for (const prop in proxy) {
    console.log(prop);
  }
  console.log(`=============================`);
}
useCase2();
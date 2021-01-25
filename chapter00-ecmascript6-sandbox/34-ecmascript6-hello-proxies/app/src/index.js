"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/*
  No-op forwarding proxy: works as a pass-through to the target object
  By assigning a value to the proxy, you will be assigning a value 
  to the target
*/
function demoNoOpProxy() {
  const target = {};
  const handler = {};
  const proxy = new Proxy(target, handler);

  console.log(`(before) target.prop?=${ "prop" in target }`);
  proxy.prop = true;


  console.log(`(after)  target.prop?=${ "prop" in target }`);
  console.log(`target.exposed=${ target.prop }`);
  console.log("=============================");
}
demoNoOpProxy();

/*
  Adding traps to the proxy
  By adding traps you can intercept interactions with
  target object, as long as the interactions happen
  through the proxy object.
*/
function trappingGet() {
  const handler = {
    get(target, key) {
      console.log(`Get trapped for property "${ key }"`);
      return target[key];
    }
  };

  const target = {};
  const proxy = new Proxy(target, handler);
  proxy.num = 123;
  proxy.num;
  proxy.word;
  console.log("=============================");  
}
trappingGet();

/*
  Now we have Reflection in ES6
  Traps in ES6 are mapped one-to-one to the Reflect API: for every
  trap there is a matching reflection method in Reflect
*/
function reflect() {
  const handler = {
    get(target, key) {
      console.log(`Get trapped for property "${ key }"`);
      return Reflect.get(target, key);
    }
  };

  const target = {};
  const proxy = new Proxy(target, handler);
  proxy.word = "Hello to Jason Isaacs!";
  console.log(proxy.num);
  console.log(proxy.word);  
  console.log("=============================");    
}
reflect();

/*
  Trapping can become more interesting when adding logic in the handler
*/
function enhancedTrapping() {
  const handler = {
    get(target, key) {
      if (key.startsWith("_")) {
        throw new Error(`Property "${ key }" is inaccessible from the proxy`);
      }
      return Reflect.get(target, key);
    }
  };

  const target = {
    _hidden: "secret",
    exposed: "Hello"
  };
  const proxy = new Proxy(target, handler);

  try {
    console.log(proxy._hidden);
  } catch (e) {
    console.log(`Error accessing property: ${ e }`);
  }
  console.log(proxy.exposed);
  console.log("=============================");
}
enhancedTrapping();

/*
  Trapping set and get

  In the next example we use a proxy to prevent access to
  underscore properties.
*/
function setGetTraps() {
  const handler = {
    get(target, key) {
      invariant(key, "get");
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      invariant(key, "set");
      return Reflect.set(target, key, value);
    }
  };

  function invariant(key, action) {
    if (key.startsWith("_")) {
      throw new Error(`Invalid attempt to ${ action } private "${ key }" property`);
    }
  }
  const target = {};
  const proxy = new Proxy(target, handler);

  // consuming the proxy
  proxy.text = "hello to Jason Isaacs!";        // writing through the proxy
  console.log(`target.text=${ target.text }`);  // reading directly
  console.log(`proxy.text=${ proxy.text }`);    // reading through the proxy
  try {
    proxy._hidden = "hush!";
  } catch (e) {
    console.log(`Error while writing through the proxy: ${ e }`);
  }
  try {
    console.log(proxy._hidden);
  } catch (e) {
    console.log(`Error while reading through the proxy: ${ e }`);
  }
  console.log("=============================");
}
setGetTraps();

/*
  The desired pattern consist in completely
  hide the target object from consumers, so
  that clients have to work with it through
  the proxy
*/
function hidingTargetObjectBehindProxies() {
  
  function proxied() {
    function invariant(key, action) {
      if (key.startsWith("_")) {
        throw new Error(`Invalid attempt to ${ action } private "${ key }" property`);
      }
    }

    const target = {};
    const handler = {
      get(target, key) {
        invariant(key, "get");
        return Reflect.get(target, key);
      },
      set(target, key, value) {
        invariant(key, "set");
        return Reflect.set(target, key, value);
      }
    };
    return new Proxy(target, handler);
  }
  
  // consuming the proxy
  const proxy = proxied();
  proxy.text = "hello to Jason Isaacs!";        // writing through the proxy
  console.log(`proxy.text=${ proxy.text }`);    // reading through the proxy
  try {
    proxy._hidden = "hush!";
  } catch (e) {
    console.log(`Error while writing through the proxy: ${ e }`);
  }
  try {
    console.log(proxy._hidden);
  } catch (e) {
    console.log(`Error while reading through the proxy: ${ e }`);
  }
  console.log("=============================");
}
hidingTargetObjectBehindProxies();

/*
  Additional traps: has() trap

  handler.has lets you conceal add logic associated to `in` operations
  You should return true or false to signal whether the property is accessible or not
*/
function hasTrap() {
  const handler = {
    get(target, key) {
      invariant(key, "get");
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      invariant(key, "set");
      return Reflect.set(target, key, value);
    },
    has(target, key) {
      if (key.startsWith("_")) {
        return false;
      }
      return Reflect.has(target, key);
    }
  };
  function invariant(key, action) {
    if (key.startsWith("_")) {
      throw new Error(`Invalid attempt to ${ action } private ${ key } property`);
    }
  }

  const target = {
    _hidden: "This is an internal hidden property",
    exposed: "This is a read/write property"
  };

  const proxy = new Proxy(target, handler);
  console.log(`_hidden in proxy=${ "_hidden" in proxy }`);
  console.log(`exposed in proxy=${ "exposed" in proxy }`);
  console.log(`_hidden in target=${ "_hidden" in target }`);
  console.log(`proxy.hasOwnProperty("_hidden")=${ proxy.hasOwnProperty("_hidden") }`);

  console.log("=============================");
}
hasTrap();

/*
  Additional traps: deleteProperty() trap

  handler.deleteProperty lets you add custom logic associated to `delete` operations
*/
function deletePropertyTrap() {
  const handler = {
    get(target, key) {
      invariant(key, "get");
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      invariant(key, "set");
      return Reflect.set(target, key, value);
    },
    has(target, key) {
      if (key.startsWith("_")) {
        return false;
      }
      return Reflect.has(target, key);
    },
    deleteProperty(target, key) {
      invariant(key, "delete");
      return Reflect.deleteProperty(target, key);
    }
  };
  
  function invariant(key, action) {
    if (key.startsWith("_")) {
      throw new Error(`Invalid attempt to ${ action } private ${ key } property`);
    }
  }

  const target = { _hidden: "foo", exposed: "bar" };
  const proxy = new Proxy(target, handler);

  console.log(`_hidden in proxy=${ "_hidden" in proxy }`);
  console.log(`exposed in proxy=${ "exposed" in proxy }`);
  try {
    delete proxy._hidden;
  } catch (err) {
    console.log(`Error deleting property: ${ err }`);
  }
  
  try {
    delete proxy.exposed;
  } catch (err) {
    console.log(`Error deleting property: ${ err }`);
  }
  console.log(`_hidden in proxy=${ "_hidden" in proxy }`);
  console.log(`exposed in proxy=${ "exposed" in proxy }`);
  console.log("=============================");
}
deletePropertyTrap();

/*
  Additional traps: defineProperty() trap

  handler.defineProperty lets you intercept properties being defined
  In the example, we prevent the creation of private properties in the object

  Note that the set trap will be invoked prior to defineProperty
*/
function definePropertyTrap() {
  const handler = {
    defineProperty(target, key, descriptor) {
      invariant(key, "define");
      return Reflect.defineProperty(target, key, descriptor);
    }    
  };
  
  function invariant(key, action) {
    if (key.startsWith("_")) {
      throw new Error(`Invalid attempt to ${ action } private ${ key } property`);
    }
  }

  const target = { _hidden: "foo", exposed: "bar" };
  const proxy = new Proxy(target, handler);

  try {
    proxy._secret = "oops!";
  } catch (err) {
    console.log(`Error defining property: ${ err }`);
  }
  
  try {
    proxy.message = "Hello to Jason Isaacs!";
  } catch (err) {
    console.log(`Error deleting property: ${ err }`);
  }
  console.log(`_secret in proxy=${ "_secret" in proxy }`);
  console.log(`message in proxy=${ "message" in proxy }`);


  // It also traps Object.defineProperty calls
  try {
    Object.defineProperty(proxy, "_secret", {value: true, writable: false});
  } catch (err) {
    console.log(`Error while using Object.defineProperty: ${ err }`);
  }

  console.log("=============================");
}
definePropertyTrap();

/*
  Additional traps: ownKeys() trap

  handler.ownKeys lets you intercept calls that return an Array of the 
  properties of the object

  In the example, we implement the interceptor to hide private properties
  that starts with "_"

  ownKeys interceptor is used during the following operations and with
  the following restrictions:
  + Reflect.ownKeys(): return every own key on the object
  + Object.getOwnPropertyNames(): returns only non-symbol properties
  + Object.getOwnPropertySysmbols() returns only symbol properties
  + Object.keys() returns only non-symbols enumerable properties
  + for..in return only non-symbol enumerable properties
*/
function ownKeysTrap() {
  const handler = {
    ownKeys(target) {
      return Reflect.ownKeys(target)
        .filter(key => {
          const isStringKey = typeof key === "string";
          if (isStringKey) {
            return !key.startsWith("_");
          }
          return true;
        });
    }    
  };

  const target = { _hidden: "foo", exposed: "bar", [Symbol("id")]: "47eb8800" };
  const proxy = new Proxy(target, handler);

  for (const key of Object.keys(proxy)) {
    console.log(key);
  }
  console.log(Object.getOwnPropertyNames(proxy));
  console.log(Object.getOwnPropertySymbols(proxy));

  console.log("=============================");
}
ownKeysTrap();

/*
  Additional traps: getOwnPropertyDescriptor() trap

  handler.getOwnPropertyDescriptor lets you intercept calls that 
  ask for the property descriptor of some key.
  
  In the example, we conceal properties starting with "_"

  This method traps calls to:
  + Reflect.getOwnPropertyDescriptor
  + object.hasOwn Property

*/
function ownPropertyDescriptorTrap() {
  const handler = {
    getOwnPropertyDescriptor(target, key) {
      if (key.startsWith("_")) {
        return;
      }
      return Reflect.getOwnPropertyDescriptor(target, key);
    }
  };

  const target = { _hidden: "foo", exposed: "bar" };
  const proxy = new Proxy(target, handler);

  console.log(Reflect.getOwnPropertyDescriptor(proxy, "_secret"));
  console.log(Reflect.getOwnPropertyDescriptor(proxy, "exposed"));
  
  console.log(proxy.hasOwnProperty("_secret"));
  console.log(proxy.hasOwnProperty("exposed"));

  console.log("=============================");
}
ownPropertyDescriptorTrap();

/*
  Additional traps: apply() trap

  handler.apply lets you intercept function calls.
  
  In the example, we trap a function that acts as an around interceptor,
  displaying the arguments and return value and how long it took to complete

*/
function applyTrap() {
  const handler = {
    apply(target, ctx, args) {
      console.log(`function called with ${ args }`);
      console.time("function_call");
      const result = Reflect.apply(target, ctx, args);
      console.timeEnd("function_call");
      console.log(`the result of the function call was ${ result }`);
      return result;
    }
  };

  function sum(a, b) {
    return a + b;
  }

  const proxy = new Proxy(sum, handler);
  console.log(proxy(5, 6));
  console.log("=============================");
}
applyTrap();


/*
  Tip: Trapping method call

  there is no specific Reflect method to intercept
  method calls, but you can use handler.get and this
  trick to intercept those calls

*/
function methodCallsTrap() {
  const handler = {
    get(target, key) {
      if (typeof target[key] === "function") {
        return function(...args) {
          const result = target[key].apply(this, args);
          console.log(`Method ${ key } has been called with params "${ args } with result=${ result }"`);
          return result;
        };
      } else {
        Reflect.get(target.key);
      }
    }
  };

  const target = {
    getGreeting(name) {
      return `Hello to ${ name }!!!`;
    },
    sayHello(name) {
      console.log(this.getGreeting(name));
    }
  };


  const proxy = new Proxy(target, handler);
  console.log(proxy.getGreeting("Jason Isaacs"));
  proxy.sayHello("Jason Isaacs");

  console.log("=============================");
}
methodCallsTrap();

/*
  Additional traps: construct() trap

  handler.construct lets you intercept uses of the `new` operator
  
  Note that per definition, a proxy should not change the behavior
  of the target object - if you're doing so, you might be using
  the wrong abstraction.

  In the example, we trap a the call to the constructor in order to
  define a property in the object, which will be later used by the
  method defined in the class

*/
function constructTrap() {
  const handler = {
    construct(Target, args) {
      const [ name ] = args;
      const target = Reflect.construct(Target, args);
      target.name = name;
      return target;
    }
  };

  class Target {
    sayHello() {
      console.log(`Hello to ${ this.name }`);
    }
  }

  const ProxiedTarget = new Proxy(Target, handler);

  const greeter = new ProxiedTarget("Jason Isaacs");
  greeter.sayHello();

  console.log("=============================");
}
constructTrap();


/*
  Additional traps: getPrototypeOf() trap

  handler.getPrototypeOf lets you intercept calls trying to obtain the
  prototype of an object.
  
  In the example, we implement the getPrototypeOf trap to change
  the prototype of the object received to an Array.
  Obviously, this does not mean that the rest of the Array methods
  are in the proxy!

*/
function getPrototypeOfTrap() {
  const handler = {
    getPrototypeOf: target => Array.prototype // eslint-disable-line no-unused-vars
  };

  const target = {};

  const proxy = new Proxy(target, handler);
  console.log(proxy instanceof Array);
  try {
    proxy.push("hello");
  } catch (err) {
    console.log(`Error while pushing an element to the proxy: ${ err }`);
  }

  console.log("=============================");
}
getPrototypeOfTrap();


/*
  Additional traps: setPrototypeOf() trap

  handler.setPrototypeOf lets you intercept calls trying to set the
  prototype of an object
*/
/* This just doesn't work 
function setPrototypeOfTrap() {
  const handler = {
    setPrototypeOf(target, proto) {
      Object.setPrototypeOf(target, proto);
    }
  };

  const base = {};
  function Target() {}
  const proxy = new Proxy(Target, handler);
  proxy.setPrototypeOf(proxy, base);
  console.log(proxy.prototype === base);
  console.log("=============================");
}
setPrototypeOfTrap();
*/

/*
  Additional traps: preventExtensions() trap

  handler.preventExtensions lets you intercept calls to 
  Object.preventExtensions, which can be used to forbid
  adding new properties to an existing object.
*/

function preventExtensionTrap() {
  const canExtend = new WeakSet();
  const handler = {
    preventExtensions(target) {
      const canPrevent = !canExtend.has(target);
      if (canPrevent) {
        Object.preventExtensions(target);
      }
      return Reflect.preventExtensions(target);
    }
  };

  const target = {};
  const proxy = new Proxy(target, handler);
  canExtend.add(target);
  Object.preventExtensions(proxy);
  console.log(Object.isExtensible(proxy));

  console.log("=============================");
}
preventExtensionTrap();

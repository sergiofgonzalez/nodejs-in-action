"use strict";
/* Interface inheritance */
class IdNameClass {
    constructor() {
        this.name = 'Jason Isaacs';
        this.id = 1;
    }
}
class IdClass {
    constructor() {
        this.id = 5;
    }
}
const multiObject = {
    id: 1,
    name: 'Jason Isaacs',
    description: 'a fine actor'
};
/* Class inheritance */
class BaseClass {
    constructor() {
        this.id = 0;
    }
}
class DerivedFromBaseClass extends BaseClass {
    constructor() {
        super(...arguments);
        this.name = 'Jason Isaacs';
    }
}
const derivedFromBaseClassObj = new DerivedFromBaseClass();
console.log(derivedFromBaseClassObj);
class MultipleInterfaces {
    constructor() {
        this.id = 0;
        this.name = 'Idris Elba';
    }
}
/* The `super()` function */
// with constructors
class BaseClassWithCtor {
    constructor(id) {
        this.id = id;
    }
}
class DerivedClassWithCtor extends BaseClassWithCtor {
    constructor(id, name) {
        super(id);
        this.name = name;
    }
}
/* Function overriding */
class BaseClassWithFn {
    print(text) {
        console.log(`BaseClassWithFn.print(): ${text}`);
    }
}
class DerivedClassWithFnOverride extends BaseClassWithFn {
    print(text) {
        console.log(`DerivedClassWithFnOverride.print(): ${text}`);
    }
}
const derivedClassWithFnOverrideObj = new DerivedClassWithFnOverride();
derivedClassWithFnOverrideObj.print('hello!');
// Delegation using super
class DerivedClassWithFnDelegation extends BaseClassWithFn {
    print(text) {
        super.print(`from DerivedClassWithFnDelegation: ${text}`);
    }
}
const derivedClassWithFnDelegationObj = new DerivedClassWithFnDelegation();
derivedClassWithFnDelegationObj.print('hello!');
//# sourceMappingURL=main.js.map
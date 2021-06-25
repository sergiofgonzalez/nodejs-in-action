/*
class MyClass {
  id = 55;
  printIdAfterSomeTime() {
    const callback = function () {
      // ERROR: an outer value of `this` is shadowed by this container
      console.log(`this.id:`, _this.id);
    };
    setTimeout(callback, 1_000, this);
  }
}
*/

// Making a copy of this and passing it explictly
class MyClass {
  id = 55;
  printIdAfterSomeTime() {
    const callback = function (_this: MyClass) {
      console.log(`this.id:`, _this.id);
    };
    setTimeout(callback, 1_000, this);
  }
}

const myClassObj = new MyClass();
myClassObj.printIdAfterSomeTime();


// Alternatively, we could have used an arrow function
class MyOtherClass {
  id = 88;
  printIdAfterSomeTime() {
    const callback = () => {
      // ERROR: an outer value of `this` is shadowed by this container
      console.log(`this.id:`, this.id);
    };
    setTimeout(callback, 1_000);
  }
}

const myOtherClassObj = new MyOtherClass();
myOtherClassObj.printIdAfterSomeTime();
# 14: Misc concepts &mdash; OOP refresher
> refreshing OOP pillars in TypeScript: abstraction, inheritance, encapsulation, and polymorphism.

## Description

TypeScript has first class support to OOP techniques, and the four pillars of OOP: encapsulation, abstraction, inheritance, and polymorphism can be used in a very clean way.

### Preventing subclassing

TypeScript does not provide any direct means to prevent subclassing. However, you can use the following hack to prevent that:

```typescript
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
const b: B = new B(); // fails at runtime
```

Note however that this is a runtime check, and therefore, neither the TypeScript compiler, nor the IDE will help you in the problem identification.


# Part 4: Node.js avanced patterns and techniques
## Chapter 34 &mdash; Structural design patterns
### Exercise 6: `Proxy` in action
Review the capabilities of the `Proxy` object.

#### Proxy

The `Proxy` object enables you to create a *proxy* for another object, which can intercept and redefine fundamental operations for that object.

##### Intro to `Proxy`

A `Proxy` is created with two parameters: `target`, `handler` and its basic form require no implementation and makes the `target` object and the original one behave exactly the same:

```javascript
const target = {
  message1: 'hello',
  message2: 'world'
}

const proxy = new Proxy(target, {});

console.log(proxy.message1); // hello
console.log(proxy.message2); // world
```

The `handler` object lets you define functions known as *traps* to customize the object.

```javascript
const target = {
  message1: 'hello',
  message2: 'world'
};

const proxy = new Proxy(target, {
  get: function (target, prop, receiver) {
    return 'foo';
  }
});

console.log(proxy.message1); // foo
console.log(proxy.message2); // foo
```

You will typically want to implement the handler in such a way to customize certain properties and methods of the target object, while maintaining others:

```javascript
const target = {
  message1: 'hello',
  message2: 'world'
}

const proxy = new Proxy(target, {
  get: function (target, prop, receiver) {
    if (prop === 'message2') {
      return 'to Jason Isaacs!';
    }
    return target[prop];
  }
});
```

Please see [Hello, Proxies!](chapter00-ecmascript6-sandbox/34-ecmascript6-hello-proxies) for more examples.

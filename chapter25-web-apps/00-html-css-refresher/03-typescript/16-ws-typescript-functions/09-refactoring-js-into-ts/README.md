# 09: TypeScript functions &mdash; Refactoring JavaScript into TypeScript
> an example illustrating how to rewrite a pure JavaScript code into TypeScript.

## Exercise 3.07

This exercise illustrates how to refactor JavaScript code into TypeScript, retaining the original structure of the code while enhancing it with interfaces and types.

The original code is a simple Maths library that prints the area of various geometrical shapes given the dimensions:

```javascript
var PI = 3.14;

function getCircleArea(radius) {
  return radius * radius * PI;
}

function getRectangleArea(length, width) {
  return length * width;
}

function getSquareArea(width) {
  return getRectangleArea(width, width);
}

function getRightTriangleArea(base, height) {
  return (base * height) / 2;
}

function getArea(shape) {
  switch (shape.type) {
    case 'circle':
      shape.area = getCircleArea(shape.radius);
      break;
    case 'rectangle':
      shape.area = getRectangleArea(shape.length, shape.width);
      break;
    case 'square':
      shape.area = getSquareArea(shape.width);
      break;
    case 'rightTriangle':
      shape.area = getRightTriangleArea(shape.base, shape.height);
      break;
  }
}

var circle = { type: 'circle', radius: 4 };
getArea(circle);
console.log(circle);

var rectangle = { type: 'rectangle', length: 7, width: 4 };
getArea(rectangle);
console.log(rectangle);

var square = { type: 'square', width: 5 };
getArea(square);
console.log(square);

var rightTriangle = { type: 'rightTriangle', base: 9, height: 4 };
getArea(rightTriangle);
console.log(rightTriangle);
```

The usual activities you will be perform while doing a refactoring of JavaScript code into TypeScript are the following:

1. Leverage the use of `const` and `let` instead of `var`.
2. Define interfaces for the elements of the application. In this example, we create a hierarchy of interfaces with `Shape` as its root, and then `Circle`, `Rectangle`, `RightTriangle` and `Square` inheriting from it.
3. Leverage OOP concepts with classes and polymorphic functions that are *programmed to the interfaces*. In this case, we rewrite the `getArea` function so that it receives a `Shape`.
4. Destructuring is your friend.
5. Annotate your object literals whenever TypeScript is not capable of inferring the interface types.
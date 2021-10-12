const PI = 3.14;

interface Shape {
  area?: number;
  type: 'circle' | 'rectangle' | 'rightTriangle' | 'square'
}

interface Circle extends Shape {
  radius: number;
  type: 'circle';
}

interface Rectangle extends Shape {
  length: number;
  width: number;
  type: 'rectangle';
}

interface RightTriangle extends Shape {
  base: number;
  height: number;
  type: 'rightTriangle'
}

interface Square extends Shape {
  width: number;
  type: 'square';
}


const getArea = (shape: Shape) => {
  switch (shape.type) {
    case 'circle':
      return getCircleArea(shape as Circle);

    case 'rectangle':
      return getRectangleArea(shape as Rectangle);

    case 'rightTriangle':
      return getRightTriangleArea(shape as RightTriangle);

    case 'square':
      return getSquareArea(shape as Square);

    default:
      throw new Error(`Unexpected shape type: ${ shape.type }`);
  }
};


function getCircleArea(circle: Circle) {
  return circle.radius * circle.radius * PI;
}

function getRectangleArea(rectangle: Rectangle) {
  const { length, width } = rectangle;
  return length * width;
}

function getSquareArea(square: Square) {
  const { width } = square;
  return getRectangleArea({ length: width, width: width, type: 'rectangle' });
}

function getRightTriangleArea(rightTriangle: RightTriangle) {
  const { base, height } = rightTriangle;
  return (base * height) / 2;
}


const circle: Circle = { type: 'circle', radius: 4 };
console.log({...circle, area: getArea(circle) });

const rectangle: Rectangle = { type: 'rectangle', length: 7, width: 4 };
console.log({...rectangle, area: getArea(rectangle) });

const square: Square = { type: 'square', width: 5 };
console.log({...square, area: getArea(square) });

const rightTriangle: RightTriangle = { type: 'rightTriangle', base: 9, height: 4 };
console.log({...rightTriangle, area: getArea(rightTriangle) });
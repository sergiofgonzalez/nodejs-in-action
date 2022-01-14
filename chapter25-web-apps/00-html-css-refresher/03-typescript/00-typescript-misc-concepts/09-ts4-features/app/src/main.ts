
/* variadic tuple types */
console.log(`\n==================== variadic tuple types`);
type Point2d = [number, number];
type Point3d = [number, number, number];
const point1: Point2d = [1, 2];
const point2: Point3d = [1, 2, 3];

type NamedType<T extends unknown[]> = [string, ...T];
type NamedPoint2d = NamedType<Point2d>;
const point3: NamedPoint2d = ['Point: (1, 2)', ...point1];

type NamedPoint3d = NamedType<Point3d>;
const point4: NamedPoint3d = ['Point: (1, 2, 3)', ...point2];

const point5: NamedPoint2d = ['Point: (3, 4)', 3, 4];
const point6: NamedPoint3d = ['Point: (3, 4, 5)', 3, 4, 5];

function display(t: NamedPoint2d | NamedPoint3d) {
  console.log(t[0], t.slice(1));
}

display(point3);
display(point4);
display(point5);
display(point6);

function displayGeneric<T extends unknown[]>(t: [string, ...T]) {
  console.log(t[0], t.slice(1));
}

displayGeneric(point5);
displayGeneric(point6);

/* template literal types */
console.log(`\n==================== template literal types`);

type Suit = `${ 'Spades' | 'Hearts'  | 'Diamonds' | 'Clubs' }`;
type Rank = `${ '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace' }`;
type Deck = `${ Rank } of ${ Suit }`;

const card: Deck = '10 of Hearts';
console.log(typeof card);

/* labeled tuples */
console.log(`\n==================== labeled tuple types`);

type LabeledPoint2D = [x: number, y: number];
type LabeledPoint3D = [x: number, y: number, z: number];

const point7: LabeledPoint2D = [1, 2];
const point8: LabeledPoint3D = [1, 2, 3];

console.log(point7);
console.log(point8);


// type-guard
function isLabeledPoint2D(point: LabeledPoint2D | LabeledPoint3D): point is LabeledPoint2D {
  return point.length === 2;
}

function displayLabeledPoint(p: LabeledPoint2D | LabeledPoint3D) {
  if (isLabeledPoint2D(p)) {
    // console.log(p.x, p.y); // only labels, not fields
    console.log(p[0], p[1]);
  } else {
    // console.log(p.x, p.y, p.z); // only labels, not fields
    console.log(p[0], p[1], p[2]);
  }
}

displayLabeledPoint(point7);
displayLabeledPoint(point8);


const point7: LabeledPoint2D = [x:1, y:2];
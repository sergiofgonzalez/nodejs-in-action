interface Order {
  id: number;
  color: string;
  size: string;
}


// version 0: original, non-curried function
// export const orderFactory = (): (color: string, size: string, quantity: number) => Order[] => {
//   let id = 0;
//   const createOrder = (color: string, size: string, quantity: number): Order[] => {
//     const orders = [];
//     for (let i = 0; i < quantity; i++) {
//       orders.push({ id: id++, color, size });
//     }
//     return orders;
//   };
//   return createOrder;
// };


// version 1: curried function, verbose syntax
// export const orderFactory = () => {
//   let id = 0;
//   return (color: string) => {
//     return (size: string) => {
//       return (quantity: number): Order[] => {
//         const orders = [];
//         for (let i = 0; i < quantity; i++) {
//           orders.push({ id: id++, color, size });
//         }
//         return orders;
//       };
//     };
//   };
// };


// version 2: curried function, more concise syntax (removing returns)
// export const orderFactory = () => {
//   let id = 0;
//   return (color: string) =>
//     (size: string) =>
//       (quantity: number): Order[] => {
//         const orders = [];
//         for (let i = 0; i < quantity; i++) {
//           orders.push({ id: id++, color, size });
//         }
//         return orders;
//   };
// };

// version 3: curried function, as concise as can be
export const orderFactory = () => {
  let id = 0;
  return (color: string) => (size: string) => (quantity: number): Order[] => {
        const orders = [];
        for (let i = 0; i < quantity; i++) {
          orders.push({ id: id++, color, size });
        }
        return orders;
  };
};


const createOrder = orderFactory();

const orderOne = createOrder('red')('M')(4);
console.log(orderOne);

const orderTwo = createOrder('blue')('S')(7);
console.log(orderTwo);

// benefits of curried functions
const redLine = createOrder('red');


const redSmall = redLine('S');
const redMedium = redLine('M');

const orderThree = redSmall(5);
const orderFour = redMedium(2);

console.log(orderThree);
console.log(orderFour);


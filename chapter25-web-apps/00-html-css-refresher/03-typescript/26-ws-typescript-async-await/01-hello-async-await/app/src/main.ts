async function addAsync(num1: number, num2: number): Promise<number> {
  return num1 + num2;
}

const addAsyncFn: (num1: number, num2: number) => Promise<number> = async (num1: number, num2: number) => {
  return num1 + num2;
};

/* trick to use top-level await */
export {};

const five = await addAsync(2, 3);
const ten = await addAsyncFn(7, 3);

console.log(`five=`, five);
console.log(`ten=`, ten);

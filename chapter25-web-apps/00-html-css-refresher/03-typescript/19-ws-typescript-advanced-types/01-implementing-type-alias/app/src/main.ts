type Count = number;

type Product = {
  name: string;
  count: Count;
  price: number;
  amount: number;
}

const products: Product[] = [];

function makeProduct(p: Product) {
  products.push(p);
}

for (let i = 0; i < 5; i++) {
  const p: Product = {
    name: `Product_${ i }`,
    count: i,
    price: 100,
    amount: 15
  };
  makeProduct(p);
}

console.log(products);

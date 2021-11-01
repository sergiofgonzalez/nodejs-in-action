type Product = {
  name: string,
  price: number,
  amount: number
}

type Post = {
  header: string,
  method: string,
  product: Product
}

type Put = {
  header: string,
  method: string,
  product: Product,
  productId: number
}

type Request = Post | Put

const products: Product[] = [];

function processRequest(request: Request) {
  if ('productId' in request) {
    products[request.productId] = request.product;
  } else {
    products.push(request.product);
  }
}

const apple: Product = {
  name: 'apple',
  price: 12345,
  amount: 10
};

const mango: Product = {
  name: 'mango',
  price: 67890,
  amount: 15
};

const postAppleRequest: Post = {
  header: 'post-header',
  method: 'new',
  product: apple
};

processRequest(postAppleRequest);

console.log(products);

const putMangoRequest: Put = {
  header: 'put-header',
  method: 'update',
  product: mango,
  productId: 0
};

processRequest(putMangoRequest);
console.log(products);

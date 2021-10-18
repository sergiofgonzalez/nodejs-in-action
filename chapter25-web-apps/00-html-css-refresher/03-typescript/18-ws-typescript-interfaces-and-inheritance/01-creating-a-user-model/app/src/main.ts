interface ProductTemplate {
  height: number;
  width: number;
  color: string;
}

const productMaker = (product: ProductTemplate) => {
  return product;
};

const myProduct: ProductTemplate = {
  height: 10,
  width: 15,
  color: 'blue'
};

console.log(productMaker(myProduct));

// this does not conform to ProductTemplate
const badProduct = {
  height: 10,
  length: 15,
  color: 'red'
};

// productMaker(badProduct); // ERROR: badProduct not assignable to ProductTemplate


const goodProduct = {
  height: 10,
  width: 5,
  color: 'red'
};

console.log(productMaker(goodProduct));

// you can also create an interface for the function:
interface ProductMakerFunctionInterface {
  // mimics the method definition in a class, without the method name
  (product: ProductTemplate) : ProductTemplate
}

const productMaker2: ProductMakerFunctionInterface = (product: ProductTemplate) => {
  return product;
};

console.log(productMaker2(myProduct));

interface ProductClassInterface {
  product: ProductTemplate;
  makeProduct(product: ProductTemplate): ProductTemplate;
}

// now we create a class
class Product implements ProductClassInterface {
  product: ProductTemplate;

  constructor(product: ProductTemplate) {
    this.product = product;
  }

  makeProduct(): ProductTemplate {
    return this.product;
  }
}

const product = new Product(myProduct);
console.log(product.makeProduct());


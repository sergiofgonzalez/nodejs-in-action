import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

interface IProductId {
  id: number;
}

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
}

/* my approach: chain of observables but only one subscribe() */
function getProductIds(): Observable<IProductId> {
  const productIds: Observable<IProductId> = of(
    { id: 1 },
    { id: 2 },
    { id: 3}
  );
  return productIds;
}

function getProducts(productIds: Observable<IProductId>): Observable<IProduct> {
  return productIds.pipe(
    map((productId) => {
      /* in the example below we do of(IProduct) instead */
      return {
        id: productId.id,
        name: `name_${  productId.id }`,
        description: `desc_${ productId.id }`,
        price: productId.id * 1_000
      };
    })
  );
}

getProducts(getProductIds())
  .subscribe((product) => {
    console.log(`<< received:`, product);
  });


/* example approach */
const productIds: Observable<IProductId> = from([{ id: 4 }, { id: 5 }, { id: 6 }]);

function getProductDetails(productId: number): Observable<IProduct> {
  return of(
    {
      id: productId,
      name: `name_${  productId }`,
      description: `desc_${ productId }`,
      price: productId * 1_000
    }
  );
}

productIds.pipe(
  map((productId: IProductId) => getProductDetails(productId.id))
).subscribe((productStrean: Observable<IProduct>) => {
  productStrean.subscribe((product: IProduct) => {
    console.log(`<< received:`, product);
  });
});

/* final approach using mergeMap */
const moreProductIds: Observable<IProductId> = from([{ id: 7 }, { id: 8 }, { id: 9 }]);
moreProductIds.pipe(
  mergeMap((productId: IProductId) => getProductDetails(productId.id))
).subscribe((product: IProduct) => {
  console.log(`<< received:`, product);
});


import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

interface IProductId {
  id: number;
}

interface IProductDetails {
  name: string;
  description: string;
}


const productList: Observable<IProductId> = from([{ id: 1 }, { id: 2}, { id: 3 }]);

function getProductDetails(id: number): Observable<IProductDetails> {
  return of({ name: `Product_${id}`, description: `Description for Product_${id}`});
}

productList.pipe(
  map((value: IProductId) => getProductDetails(value.id)),
).subscribe((value: Observable<IProductDetails>) => {
  value.subscribe((value: IProductDetails) => {
    console.log(`----------------`);
    console.log(`Product name:`, value.name);
    console.log(`Product desc:`, value.description);
    console.log(`----------------`);
  });
});

productList.pipe(
  mergeMap((value: IProductId): Observable<IProductDetails> => getProductDetails(value.id)),
).subscribe((value: IProductDetails) => {
  console.log(`--mergemap---------------`);
  console.log(`Product name:`, value.name);
  console.log(`Product desc:`, value.description);
  console.log(`-------------------------`);
});
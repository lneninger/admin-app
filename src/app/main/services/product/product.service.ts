import { ProductCategoryEndpoint } from './product-endpoint.service.';
import { NgxsBaseDataRepository } from '../+redux/base-redux.service';
import { Injectable } from '@angular/core';
import { AddProductRequest, AddProductResponse, IProduct, IProductItem, ProductStateModel } from './product.models';
import { Observable } from 'rxjs';
import { DataAction, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import produce from 'immer';
import { State } from '@ngxs/store';
import { DataRetrieverInput } from 'src/app/shared/grid/grid-config';
import { map } from 'rxjs/operators';

@StateRepository()
@State<ProductStateModel>({
  name: 'productState',
  defaults: {

  }
})
@Injectable()
export class ProductService extends NgxsBaseDataRepository<ProductStateModel>{
  productTags = ['HARDGOOD', 'FOOD', 'FLOWER', 'COMPOSITION'];

  constructor(private endpoint: ProductCategoryEndpoint) {
    super();
  }

  search(input: DataRetrieverInput) {
    return this.endpoint.search(input);
  }

  formatTreeData(items: IProductItem[], parent: IProductItem = null) {

    // debugger
    const children = items.filter(item => item.parentId == (parent && parent.id));
    if (parent) {
      parent.children = children;
    }

    children.forEach(child => {
      child.treeLevel = (parent && parent.treeLevel || 0) + 1;
      this.formatTreeData(items, child);
    });

    if (parent) {
      children.forEach(child => {
        items.splice(items.findIndex(item => item == child), 1);
      });

    }

    return items;
  }

  get(id: string): Observable<IProduct> {
    return this.endpoint.get(id);
  }

  add(request: AddProductRequest): Observable<AddProductResponse> {
    return this.endpoint.add(request);
  }

  delete(id: number): Observable<any> {
    return this.endpoint.delete(id);
  }



  @DataAction()
  setCurrent(@Payload('category') product: IProduct) {
    this.ctx.setState(produce(this.ctx.getState(), (draft: ProductStateModel) => {
      draft.currentProduct = product;
    }));

    return this.snapshot.currentProduct;
  }

}

import { ProductCategoryEndpoint } from './product-category-endpoint.service.';
import { NgxsBaseDataRepository } from './../+redux/base-redux.service';
import { EventEmitter, Injectable } from '@angular/core';
import { AddProductCategoryRequest, AddProductCategoryResponse, IProductCategory, IProductCategoryItem, ProductCategoryStateModel } from './product-category.models';
import { Observable } from 'rxjs';
import { DataAction, Payload, StateRepository } from '@ngxs-labs/data/decorators';
import produce from 'immer';
import { State } from '@ngxs/store';
import { DataRetrieverInput } from 'src/app/shared/grid/grid-config';
import { map } from 'rxjs/operators';

@StateRepository()
@State<ProductCategoryStateModel>({
  name: 'productCategoryState',
  defaults: {

  }
})
@Injectable()
export class ProductCategoryService extends NgxsBaseDataRepository<ProductCategoryStateModel>{
  productCategoryTags = ['HARDGOOD', 'FOOD', 'FLOWER', 'COMPOSITION'];
  reload$ = new EventEmitter<any>();

  constructor(private endpoint: ProductCategoryEndpoint) {
    super();
  }

  getAll() {
    console.log(`Executed getAll!!`);
    return this.endpoint.getAll();
  }

  search(input: DataRetrieverInput) {
    return this.endpoint.search(input);
  }

  formatTreeData(items: IProductCategoryItem[], parent: IProductCategoryItem = null): IProductCategoryItem[] {

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

  get(id: string): Observable<IProductCategory> {
    return this.endpoint.get(id);
  }

  add(request: AddProductCategoryRequest): Observable<AddProductCategoryResponse> {
    return this.endpoint.add(request);
  }

  delete(id: number): Observable<any> {
    return this.endpoint.delete(id);
  }



  @DataAction()
  setCurrent(@Payload('category') category: IProductCategory) {
    this.ctx.setState(produce(this.ctx.getState(), (draft: ProductCategoryStateModel) => {
      draft.currentCategory = category;
    }));

    return this.snapshot.currentCategory;
  }

}

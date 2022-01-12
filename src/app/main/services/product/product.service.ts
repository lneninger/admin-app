import { ProductCategoryEndpoint } from './product-endpoint.service.';
import { NgxsBaseDataRepository } from '../+redux/base-redux.service';
import { Injectable } from '@angular/core';
import { AddProductRequest, AddProductResponse, IProduct, IProductItem, ProductStateModel } from './product.models';
import { Observable } from 'rxjs';
import { DataAction, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import produce from 'immer';
import { State } from '@ngxs/store';
import { DataRetrieverInput } from 'src/app/shared/grid/grid-config';
import { first, map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { CollectionReference, Query } from '@angular/fire/firestore';

@StateRepository()
@State<ProductStateModel>({
  name: 'productState',
  defaults: {

  }
})
@Injectable()
export class ProductService extends NgxsBaseDataRepository<ProductStateModel>{
  productTags = ['HARDGOOD', 'FOOD', 'FLOWER', 'COMPOSITION'];

  constructor(private firebaseService: FirebaseService) {
    super();
  }

  async search(input: DataRetrieverInput) {
    let ref: CollectionReference<IProductItem> | Query<IProductItem> = this.firebaseService.firestore.collection<IProductItem>('app-products').ref;
    if (input.sort) {
      ref = ref.orderBy(input.sort.field)
    }

    /*Where clause*/

    let total: number;
    if (input.retrieveTotalAmount) {
      total = (await ref.get()).size;
    }

    ref = ref.limit(input.pageSize);
    ref = input.lastRetrieved ? ref.startAfter(input.lastRetrieved) : ref;
    const result = await ref.get();

    return { total, result };
  }

  // Leonardo

  // formatTreeData(items: IProductItem[], parent: IProductItem = null) {

  //   // debugger
  //   // Leonardo
  //   const children = items.filter(item => item.parentId == (parent && parent.id));
  //   if (parent) {
  //     parent.children = children;
  //   }

  //   children.forEach(child => {
  //     child.treeLevel = (parent && parent.treeLevel || 0) + 1;
  //     this.formatTreeData(items, child);
  //   });

  //   if (parent) {
  //     children.forEach(child => {
  //       items.splice(items.findIndex(item => item == child), 1);
  //     });

  //   }

  //   return items;
  // }

  list() {
    return this.firebaseService.firestore.collection<IProductItem>('app-products').snapshotChanges();
  }

  async get(id: string) {
    return this.firebaseService.firestore.collection('app-products').doc(id).get().pipe(first()).toPromise();
  }

  async add(request: AddProductRequest) {
    return this.firebaseService.firestore.collection('app-products').add(request);
  }

  async delete(id: string) {
    return this.firebaseService.firestore.collection('app-products').doc(id).delete();
  }



  @DataAction()
  setCurrent(@Payload('category') product: IProduct) {
    this.ctx.setState(produce(this.ctx.getState(), (draft: ProductStateModel) => {
      draft.currentProduct = product;
    }));

    return this.snapshot.currentProduct;
  }

}

import { DataAction, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import { Injectable } from '@angular/core';
import { limit, orderBy, query, startAfter } from '@angular/fire/firestore';
import { State } from '@ngxs/store';
import produce from 'immer';
import { firstValueFrom } from 'rxjs';
import { first } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { DataRetrieverInput } from 'src/app/shared/grid/grid-config';

import { NgxsBaseDataRepository } from '../+redux/base-redux.service';
import { AddProductRequest, IProduct, IProductItem, ProductStateModel } from './product.models';

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
    const collection= this.firebaseService.firestoreNew.collection<IProductItem>('app-products');
    let ref = collection.ref;
    let queryObj = query<IProductItem>(ref);
    if (input.sort) {
      queryObj = query<IProductItem>(ref, orderBy(input.sort.field));
    }

    /*Where clause*/

    let total: number;
    if (input.retrieveTotalAmount) {
      total = (await ref.get()).size;
    }

    queryObj = query(queryObj, limit(input.pageSize));
    queryObj = input.lastRetrieved ? query(queryObj, startAfter(input.lastRetrieved)) : queryObj;
    const result = await firstValueFrom(collection.get());

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
    return this.firebaseService.firestoreNew.collection<IProductItem>('app-products').snapshotChanges();
  }

  async get(id: string) {
    return this.firebaseService.firestoreNew.collection<IProductItem>('app-products').doc(id).get().pipe(first()).toPromise();
  }

  async add(request: AddProductRequest) {
    return this.firebaseService.firestoreNew.collection('app-products').add(request);
  }

  async delete(id: string) {
    return this.firebaseService.firestoreNew.collection('app-products').doc(id).delete();
  }



  @DataAction()
  setCurrent(@Payload('category') product: IProduct) {
    this.ctx.setState(produce(this.ctx.getState(), (draft: ProductStateModel) => {
      draft.currentProduct = product;
    }));

    return this.snapshot.currentProduct;
  }

}

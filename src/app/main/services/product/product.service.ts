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
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';

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

  search(input: DataRetrieverInput) {
    return this.firebaseService.firestore.collection('app-products').get().pipe(map($set => ($set.docs).map(doc => doc.data() as IProductItem)));
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

  get(id: string) {
    // return this.endpoint.get(id);
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

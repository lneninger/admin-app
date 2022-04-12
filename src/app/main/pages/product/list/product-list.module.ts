import { ProductModule } from '../item/product.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { GridModule } from 'src/app/shared/grid/grid.module';
import { FirestoreGridModule } from 'src/app/shared/grid/firestore/firestore-grid.module';


@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    LayoutMainCommonModule,
    GridModule,
    ProductModule,
    FirestoreGridModule
  ]
})
export class ProductCategoryListModule { }

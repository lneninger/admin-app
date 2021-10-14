import { ProductCategoryModule } from './../item/product-category.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-list-routing.module';
import { ProductCategoryListComponent } from './product-category-list.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { GridModule } from 'src/app/shared/grid/grid.module';


@NgModule({
  declarations: [ProductCategoryListComponent],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    LayoutMainCommonModule,
    GridModule,
    ProductCategoryModule
  ]
})
export class ProductCategoryListModule { }

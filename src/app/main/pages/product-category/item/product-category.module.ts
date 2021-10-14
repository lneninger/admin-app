import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ProductCategoryComponent } from './product-category.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';


@NgModule({
  declarations: [ProductCategoryComponent],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductCategoryModule { }

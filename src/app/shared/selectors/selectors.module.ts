import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorItemComponent } from './item/item.component';
import { SelectorListComponent } from './list/list.component';
import { LayoutMainCommonModule } from '../layout/layout-main/layout-main-common/layout-main-common.module';



@NgModule({
  declarations: [
    SelectorItemComponent,
    SelectorListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutMainCommonModule,
  ],
  exports: [
    SelectorItemComponent,
    SelectorListComponent
  ]
})
export class SelectorsModule { }

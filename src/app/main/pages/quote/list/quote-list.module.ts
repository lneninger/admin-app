import { FirestoreGridModule } from './../../../../shared/grid/firestore/firestore-grid.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteListRoutingModule } from './quote-list-routing.module';
import { QuoteListComponent } from './quote-list.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { GridModule } from '../../../../shared/grid/grid.module';


@NgModule({
  declarations: [QuoteListComponent],
  imports: [
    CommonModule,
    QuoteListRoutingModule,
    LayoutMainCommonModule,
    GridModule,
    FirestoreGridModule
  ]
})
export class QuoteListModule { }

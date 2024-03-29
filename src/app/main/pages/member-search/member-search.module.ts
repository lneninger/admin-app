import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberSearchRoutingModule } from './member-search-routing.module';
import { MemberSearchComponent } from './member-search.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { GridModule } from '../../../shared/grid/grid.module';
import { FirestoreGridModule } from 'src/app/shared/grid/firestore/firestore-grid.module';


@NgModule({
  declarations: [MemberSearchComponent],
  imports: [
    CommonModule,
    MemberSearchRoutingModule,
    LayoutMainCommonModule,
    FirestoreGridModule,
    GridModule
  ]
})
export class MemberSearchModule { }

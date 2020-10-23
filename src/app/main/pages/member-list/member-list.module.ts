import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberListRoutingModule } from './member-list-routing.module';
import { MemberListComponent } from './member-list.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { GridModule } from '../../../shared/grid/grid.module';


@NgModule({
  declarations: [MemberListComponent],
  imports: [
    CommonModule,
    MemberListRoutingModule,
    LayoutMainCommonModule,
    GridModule
  ]
})
export class MemberListModule { }

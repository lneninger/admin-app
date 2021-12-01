import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { LayoutMainCommonModule } from '../../layout-main-common/layout-main-common.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutMainCommonModule,

  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }

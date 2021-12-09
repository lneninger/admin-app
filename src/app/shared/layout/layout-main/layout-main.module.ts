import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutMainComponent } from './layout-main.component';
import { LayoutMainCommonModule } from './layout-main-common/layout-main-common.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarModule } from './toolbar/toolbar.module';
import { MenuModule } from './navigation/menu/menu.module';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';



@NgModule({
  declarations: [LayoutMainComponent],
  imports: [
    CommonModule,
    RouterModule,

    LayoutMainCommonModule,

    MenuModule,
    ToolbarModule
  ],
  exports: [LayoutMainComponent, LayoutMainCommonModule]
})
export class LayoutMainModule { }

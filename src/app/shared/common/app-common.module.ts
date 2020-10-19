import { LayoutMainModule } from './../layout/layout-main/layout-main.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports: [
    MatIconModule,
    FlexLayoutModule
  ]
})
export class AppCommonModule { }

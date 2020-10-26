import { LayoutMainModule } from './../layout/layout-main/layout-main.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LazyLoaderModule } from '../lazy-loader/lazy-loader.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    LazyLoaderModule
  ],
  exports: [
    FlexLayoutModule,
    MatIconModule,
    LazyLoaderModule
  ]
})
export class AppCommonModule { }

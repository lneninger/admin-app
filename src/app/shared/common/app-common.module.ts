import { LayoutMainModule } from './../layout/layout-main/layout-main.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LazyLoaderModule } from '../lazy-loader/lazy-loader.module';
import { SecurityModule } from 'src/app/main/shared/security/security-module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    LazyLoaderModule,
    SecurityModule
  ],
  exports: [
    FlexLayoutModule,
    MatIconModule,
    LazyLoaderModule,
    SecurityModule
  ]
})
export class AppCommonModule { }

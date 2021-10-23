import { LayoutMainModule } from './../layout/layout-main/layout-main.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LazyLoaderModule } from '../lazy-loader/lazy-loader.module';
import { SecurityModule } from 'src/app/main/shared/security/security-module';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    LazyLoaderModule,
    SecurityModule,

    PipesModule
  ],
  exports: [
    CommonModule,
    MatIconModule,
    LazyLoaderModule,
    SecurityModule,

    PipesModule
  ]
})
export class AppCommonModule { }

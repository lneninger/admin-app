import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutEmptyComponent } from './layout-empty.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LayoutEmptyComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LayoutEmptyComponent]
})
export class LayoutEmptyModule { }

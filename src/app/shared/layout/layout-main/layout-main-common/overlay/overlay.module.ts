import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomOverlayComponent } from './custom-overlay.component';



@NgModule({
  declarations: [CustomOverlayComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [CustomOverlayComponent, OverlayModule]
})
export class CustomOverlayModule { }

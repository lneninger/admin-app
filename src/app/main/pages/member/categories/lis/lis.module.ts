import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LISRoutingModule } from './lis-routing.module';
import { LISComponent } from './lis.component';


@NgModule({
  declarations: [LISComponent],
  imports: [
    CommonModule,
    LISRoutingModule
  ]
})
export class LISModule { }

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialImportsModule } from '../../../../shared/layout/material-imports.module';

import { LayoutEmptyModule } from '../../../../shared/layout/layout-empty/layout-empty.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';



@NgModule({
  declarations: [SignupComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SignupComponent
      }
    ]),
    CommonModule,
    FormsModule,
    MaterialImportsModule
  ],
  exports: [SignupComponent]
})
export class SignupModule { }

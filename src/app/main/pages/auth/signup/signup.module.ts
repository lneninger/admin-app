import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialImportsModule } from '../../../../shared/layout/material-imports.module';

import { LayoutEmptyModule } from '../../../../shared/layout/layout-empty/layout-empty.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { CustomFormsModule } from 'ngx-custom-validators';
import { CustomDirectivesModule } from 'src/app/shared/directives/custom-directives.module';



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
    CustomFormsModule,
    MaterialImportsModule,
    CustomDirectivesModule
  ],
  exports: [SignupComponent]
})
export class SignupModule { }

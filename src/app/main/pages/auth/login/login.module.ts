import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialImportsModule } from './../../../../shared/layout/material-imports.module';

import { LayoutEmptyModule } from './../../../../shared/layout/layout-empty/layout-empty.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ]),
    CommonModule,
    FormsModule,
    MaterialImportsModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }

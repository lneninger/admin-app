import { MaterialImportsModule } from './../../../../shared/layout/material-imports.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';



@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    MaterialImportsModule
  ],
  exports: [LogoutComponent],
})
export class LogoutModule { }

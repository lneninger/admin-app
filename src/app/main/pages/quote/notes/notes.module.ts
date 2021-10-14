import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';


@NgModule({
  declarations: [NotesComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    LayoutMainCommonModule
  ]
})
export class NotesModule { }

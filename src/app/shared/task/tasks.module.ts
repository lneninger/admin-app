import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';



@NgModule({
  declarations: [
    TaskDialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TaskDialogComponent
  ]
})
export class TasksModule { }

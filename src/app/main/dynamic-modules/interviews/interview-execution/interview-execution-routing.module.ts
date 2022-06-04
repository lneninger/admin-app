import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewExecutionComponent } from './interview-execution.component';

const routes: Routes = [{ path: '', component: InterviewExecutionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewExecutionRoutingModule { }

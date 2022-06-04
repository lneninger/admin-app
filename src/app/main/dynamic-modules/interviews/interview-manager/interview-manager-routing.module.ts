import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewManagerComponent } from './interview-manager.component';

const routes: Routes = [{ path: '', component: InterviewManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewManagerRoutingModule { }

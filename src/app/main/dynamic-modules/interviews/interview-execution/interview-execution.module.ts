import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';

import { InterviewExecutionRoutingModule } from './interview-execution-routing.module';
import { InterviewExecutionComponent } from './interview-execution.component';


@NgModule({
  declarations: [
    InterviewExecutionComponent
  ],
  imports: [
    LayoutMainCommonModule,
    InterviewExecutionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([

      {
        path: '',
        pathMatch: 'full',
        component: InterviewExecutionComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ]
})
export class InterviewExecutionModule { }

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { InterviewDashboardComponent } from './dashboard-component/interview-dashboard.component';
import { InterviewExecutionModule } from './interview-execution/interview-execution.module';
import { InterviewManagerModule } from './interview-manager/interview-manager.module';

@NgModule({
  declarations: [
    InterviewDashboardComponent
  ],
  imports: [
    LayoutMainCommonModule,
    InterviewExecutionModule,
    InterviewManagerModule,
    RouterModule.forChild([

      {
        path: '',
        pathMatch: 'full',
        component: InterviewDashboardComponent
      },
      {
        path: 'execute',
        loadChildren: () => import('./interview-execution/interview-execution.module').then(m => m.InterviewExecutionModule),
        component: InterviewDashboardComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ],
  exports: [
    InterviewExecutionModule,
    InterviewManagerModule,
    InterviewDashboardComponent
  ]
})
export class InterviewsModule {
  static entry = InterviewDashboardComponent
}

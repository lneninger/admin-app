import { NgModule } from '@angular/core';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';

import { InterviewManagerComponent } from './interview-manager.component';

@NgModule({
  declarations: [
    InterviewManagerComponent
  ],
  imports: [
    LayoutMainCommonModule,
  ]
})
export class InterviewManagerModule { }

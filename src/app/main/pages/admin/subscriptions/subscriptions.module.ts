import { SelectorsModule } from 'src/app/shared/selectors/selectors.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { AdminSubscriptionsComponent } from './subscriptions.component';
import { RouterOutletModule } from 'src/app/shared/layout/layout-main/router-outlet/router-outlet.module';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';


@NgModule({
  declarations: [AdminSubscriptionsComponent],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    LayoutMainCommonModule,
    RouterOutletModule,
    SelectorsModule
  ]
})
export class AdminSubscriptionsModule { }

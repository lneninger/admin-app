import { TelephonyState, TelephonySessionState } from './main/services/telephony/states/telephony.state';
import { TenantState } from './main/services/tenant/states/tenant.state';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppConfigState } from './shared/layout/states/appconfig.state';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { lazyArrayToObj } from './app-routing-lazy';
import { LAZY_WIDGETS } from './shared/lazy-loader/tokens';
import { HttpClientModule } from '@angular/common/http';
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { CurrentRoleState, UserState } from './main/services/user/states/user.state';
import { MemberState } from './main/services/member/states/member.state';
import { AppCommonModule } from './shared/common/app-common.module';
import { AggregatorsState } from './main/services/+state-aggregators/aggregators.state';


export function getMsAdalConfig() {
  return {
      tenant: 'd6caa1fc-dfee-4c76-84b3-80b9308aa91e',
      clientId: '108a84fb-4691-444f-abf9-2487978cd677',
      redirectUri: window.location.href,
      endpoints: {
          'https://linkinbenefits.com/Member.WebApp': '108a84fb-4691-444f-abf9-2487978cd677'
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage',
  };
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MsAdalAngular6Module.forRoot(getMsAdalConfig),
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppCommonModule,
    NgxsModule.forRoot([
      AppConfigState,
      TenantState,
      MemberState,
      UserState,
      CurrentRoleState,
      UserState,
      TelephonyState,
      TelephonySessionState,
      AggregatorsState
    ], {
      developmentMode: !environment.production
    }),
    NgxsDataPluginModule.forRoot()
  ],
  providers: [
    { provide: LAZY_WIDGETS, useFactory: lazyArrayToObj },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

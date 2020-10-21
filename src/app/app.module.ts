import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppConfigState } from './shared/states/appconfig.state';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { lazyArrayToObj } from './app-routing-lazy';
import { LAZY_WIDGETS } from './shared/lazy-loader/tokens';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppConfigState], {
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

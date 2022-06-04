import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NGXS_DATA_STORAGE_PLUGIN } from '@angular-ru/ngxs/storage';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxStripeModule } from 'ngx-stripe';
import { ProductCategoryService } from 'src/app/main/services/product-category/product-category.service';
import { UserService } from 'src/app/main/services/user/user.service';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';
import { environment } from 'src/environments/environment';

import { lazyArrayToObj } from './app-routing-lazy';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AggregatorsState } from './main/services/+state-aggregators/aggregators.state';
import { ProductService } from './main/services/product/product.service';
import { QuoteService } from './main/services/quote/quote.service';
import { SpecialistService } from './main/services/specialist/specialist.service';
import { TelephonySessionState, TelephonyState } from './main/services/telephony/states/telephony.state';
import { AuthService } from './main/services/user/auth.service';
import { AppInitializerService, initializerFactory } from './shared/app-initializer/app-initializer.service';
import { AppCommonModule } from './shared/common/app-common.module';
import { MockerService } from './shared/firebase/mocker.service';
import { NoOpMockerService } from './shared/firebase/noop-mocker.service';
import { AppConfigState } from './shared/layout/states/appconfig.state';
import { LAZY_WIDGETS } from './shared/lazy-loader/tokens';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
// import { PERSISTENCE, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
// import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
// import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';


// import { USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppCommonModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    // provide modular style for AppCheck, see app.browser/server
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideFirestore(() => {
      const firestore = getFirestore();
      // connectFirestoreEmulator(firestore, 'localhost', 8080);
      // enableIndexedDbPersistence(firestore);
      return firestore;
  }),

    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAnalyticsModule,
    // AngularFirestoreModule,


    NgxsModule.forRoot([
      AppConfigState,

      ProductCategoryService,
      ProductService,

      AuthService,

      QuoteService,
      SpecialistService,

      UserService,
      TelephonyState,
      TelephonySessionState,
      PaymentService,
      AggregatorsState
    ], {
      developmentMode: !environment.production
    }),
    // NgxsDataPluginModule.forRoot(),
    // NgxsStoragePluginModule.forRoot({
    //   key: [
    //     AuthService,
    //     TenantService
    //   ]
    // }),
    NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
    NgxStripeModule.forRoot(environment.stripe.publicKey),
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializerFactory, deps: [AppInitializerService], multi: true },
    { provide: LAZY_WIDGETS, useFactory: lazyArrayToObj },
    // { provide: PERSISTENCE, useValue: 'session' },

    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined },
    // { provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? ['localhost', '9000'] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', '7099'] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', '6099'] : undefined },

    { provide: MockerService, useClass: environment.production ? NoOpMockerService : MockerService },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

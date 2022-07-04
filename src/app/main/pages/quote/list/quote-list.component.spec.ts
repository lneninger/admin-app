import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { OAuthModule } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import { ProductCategoryService } from 'src/app/main/services/product-category/product-category.service';
import { ProductService } from 'src/app/main/services/product/product.service';
import { IQuoteItem } from 'src/app/main/services/quote/quote.models';
import { QuoteService } from 'src/app/main/services/quote/quote.service';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { DataRetrieverInput, GridData } from 'src/app/shared/grid/grid-config';
import { GridModule } from 'src/app/shared/grid/grid.module';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { MenuModule } from 'src/app/shared/layout/layout-main/navigation/menu/menu.module';
import { MaterialImportsModule } from 'src/app/shared/layout/material-imports.module';
import { AppConfigState } from 'src/app/shared/layout/states/appconfig.state';

import { QuoteListComponent } from './quote-list.component';
import { ComponentHarness, HarnessEnvironment, HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';


const MockQuoteService = {
  search(input: DataRetrieverInput): Observable<GridData<IQuoteItem>> {
    return of({
      totalCount: 1,
      items: [
        {
          id: 1,
          description: 'Test Description 1',
          customerId: 1,
          customerName: 'Test Customer Name 1',

          productId: 1,
          productName: 'Test Product Name 1',

          createdDate: new Date()
        } as IQuoteItem,
        {
          id: 2,
          description: 'Test Description 2',
          customerId: 1,
          customerName: 'Test Customer Name 2',

          productId: 1,
          productName: 'Test Product Name 2',

          createdDate: new Date()
        } as IQuoteItem
      ]
    });
  }
}

describe('QuoteListComponent', () => {
  let component: QuoteListComponent;
  let fixture: ComponentFixture<QuoteListComponent>;
  let quoteService: QuoteService;
  let rootLoader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteListComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialImportsModule,
        LayoutMainCommonModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        OAuthModule.forRoot(),
        GridModule,

        NgxsModule.forRoot(
          [
            AppConfigState,
            ProductService,
            ProductCategoryService,
            AuthService,
            QuoteService
          ]
        ),
        NgxsStoragePluginModule.forRoot(),

      ],
      providers: [
        Store,
        { provide: QuoteService, useValue: MockQuoteService },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListComponent);
    rootLoader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    // // quoteService = TestBed.inject(QuoteService);
    // // quoteService = TestBed.inject(QuoteService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get quote list', async () => {
    fixture.whenStable().then(async () => {
      await expect(component.dataResponse).toBeTruthy();
      await expect(component.dataResponse.length).toBeGreaterThan(1);
    });
  });

  it('should show quote list', async () => {
    fixture.whenStable().then(async () => {

      const tableHarness = await rootLoader.getHarness<MatTableHarness>(MatTableHarness);
      const rows = await tableHarness.getRows();
      expect(rows.length).toEqual(2);
    });
  });


});

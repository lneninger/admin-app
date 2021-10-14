import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientModule } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import {MatTreeHarness} from '@angular/material/tree/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { OAuthModule } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import { IProductCategoryItem } from 'src/app/main/services/product-category/product-category.models';
import { ProductCategoryService } from 'src/app/main/services/product-category/product-category.service';
import { ProductService } from 'src/app/main/services/product/product.service';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { DataRetrieverInput, GridData } from 'src/app/shared/grid/grid-config';
import { GridModule } from 'src/app/shared/grid/grid.module';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { MaterialImportsModule } from 'src/app/shared/layout/material-imports.module';
import { AppConfigState } from 'src/app/shared/layout/states/appconfig.state';

import { ProductCategoryListComponent } from './product-category-list.component';


@Injectable()
export class MockProductCategoryService extends ProductCategoryService {
  reload$ = new EventEmitter<boolean>();
  search(input: DataRetrieverInput): Observable<GridData<IProductCategoryItem>> {
    return of({
      totalCount: 1,
      items: [
        {
          id: 1,
          parentId: null,
          name: 'Category 1',
          description: 'Category 1',

          treeLevel: 1,
          children: [],
          tags: 'HARDGOOD'
        } as IProductCategoryItem,
        {
          id: 2,
          parentId: 1,
          name: 'Child Parent 1',
          description: 'Child Parent 1',

          treeLevel: 2,
          children: [],
          tags: 'HARDGOOD'
        } as IProductCategoryItem
      ]
    });
  }
}

describe('ProductCategoryListComponent', () => {
  let component: ProductCategoryListComponent;
  let fixture: ComponentFixture<ProductCategoryListComponent>;
  let rootLoader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
            AuthService
          ]
        ),
        NgxsStoragePluginModule.forRoot(),
      ],
      declarations: [
        ProductCategoryListComponent
      ],
      providers: [
        Store,
        { provide: ProductCategoryService, useClass: MockProductCategoryService },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryListComponent);
    rootLoader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get category list', async () => {
    fixture.detectChanges();

    expect(component.dataResponse).toBeTruthy();
    expect(component.dataResponse.length).toBeGreaterThan(1);

  });

  it('should show category list', async () => {
    const tableHarness = await rootLoader.getHarness<MatTableHarness>(MatTableHarness);
    const rows = await tableHarness.getRows();
    expect(rows.length).toEqual(2);
  });

  it('should show category tree', async () => {
    const tableHarness = await rootLoader.getHarness<MatTableHarness>(MatTableHarness);
    expect(tableHarness).toBeTruthy();

    const tabHarness = await rootLoader.getHarness<MatTabGroupHarness>(MatTabGroupHarness);
    await tabHarness.selectTab({
      label: 'Tree'
    });

    const treeHarness = await rootLoader.getHarness<MatTreeHarness>(MatTreeHarness);

    const rows = await tableHarness.getRows();
    expect(rows.length).toEqual(2);
  });
});

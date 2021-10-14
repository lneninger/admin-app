import { AuthService } from './../../../services/user/auth.service';
import { RouterModule } from '@angular/router';
import { ProductCategoryService } from './../../../services/product-category/product-category.service';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialImportsModule } from './../../../../shared/layout/material-imports.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductService } from './../../../services/product/product.service';
import { NgxsStoragePlugin, NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule, Store } from '@ngxs/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { IProductCategoryItem } from 'src/app/main/services/product-category/product-category.models';
import { RouterTestingModule } from '@angular/router/testing';
import { OAuthModule } from 'angular-oauth2-oidc';


class MockProductCategoryService {
  getAll(): Observable<IProductCategoryItem[]>{
    return of([])
  }

  formatTreeData(items: IProductCategoryItem[], parent: IProductCategoryItem = null): IProductCategoryItem[]{
    return items;
  }
}

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let categoryService: ProductCategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialImportsModule,
        LayoutMainCommonModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        OAuthModule.forRoot(),

        NgxsModule.forRoot(
          [
            ProductService,
            ProductCategoryService,
            AuthService
          ]
        ),
        NgxsStoragePluginModule.forRoot(),

      ],
      providers: [
        Store,
        {provide: ProductCategoryService, useClass: MockProductCategoryService},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(ProductCategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get category list', () => {
    fixture.detectChanges();

    spyOn(categoryService, 'getAll').and.returnValue(of([
      {
        id: 0,
        parentId: 0,
        name: 'Test Name',
        description: 'Test Description'
      } as IProductCategoryItem
    ]));

    component.ngOnInit();
    fixture.detectChanges();
    fixture.detectChanges();

    expect(component.categoryDataResponse).toBeTruthy();
    expect(component.categoryDataResponse.length).toBe(1);

  });
});

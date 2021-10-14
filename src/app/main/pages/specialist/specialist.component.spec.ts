import { HttpClientModule } from '@angular/common/http';
import { Quote } from '@angular/compiler';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { OAuthModule } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { MenuService } from 'src/app/shared/layout/layout-main/navigation/menu/menu.service';
import { MaterialImportsModule } from 'src/app/shared/layout/material-imports.module';
import { AppConfigState } from 'src/app/shared/layout/states/appconfig.state';
import { ProductCategoryService } from '../../services/product-category/product-category.service';
import { ProductService } from '../../services/product/product.service';
import { Specialist } from '../../services/specialist/specialist.models';
import { SpecialistService } from '../../services/specialist/specialist.service';
import { AuthService } from '../../services/user/auth.service';
import { SpecialistListComponent } from './list/specialist-list.component';

import { SpecialistComponent } from './specialist.component';


class MockSpecialistService {
  get(): Observable<Specialist[]> {
    return of([]);
  }
}

describe('SpecialistComponent', () => {
  let component: SpecialistComponent;
  let fixture: ComponentFixture<SpecialistComponent>;
  let menuService: MenuService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialistListComponent],
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
            AppConfigState,
            ProductService,
            ProductCategoryService,
            AuthService
          ]
        ),
        NgxsStoragePluginModule.forRoot(),

      ],
      providers: [
        Store,
        { provide: SpecialistService, useClass: MockSpecialistService },
        { provide: MatDialogRef, useValue: {} },
        {provide: ActivatedRoute, useValue: {snapshot: {data: {'quote': {id: 123}}}}}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    menuService = TestBed.inject(MenuService);
    spyOn(menuService, 'updateItems').and.callFake((patch, ids) => {

    });

    fixture = TestBed.createComponent(SpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

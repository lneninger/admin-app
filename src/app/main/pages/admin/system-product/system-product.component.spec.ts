import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemProductComponent } from './system-product.component';

describe('AdminDashboardComponent', () => {
  let component: SystemProductComponent;
  let fixture: ComponentFixture<SystemProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

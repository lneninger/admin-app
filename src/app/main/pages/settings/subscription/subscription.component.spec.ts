import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsBankingComponent } from './banking.component';

describe('AdminDashboardComponent', () => {
  let component: SettingsBankingComponent;
  let fixture: ComponentFixture<SettingsBankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsBankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

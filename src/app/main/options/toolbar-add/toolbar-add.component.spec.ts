import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarAddComponent } from './toolbar-add.component';

describe('ToolbarAddComponent', () => {
  let component: ToolbarAddComponent;
  let fixture: ComponentFixture<ToolbarAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

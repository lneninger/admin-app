import { TestBed } from '@angular/core/testing';

import { LayoutMainService } from './layout-main.service';

describe('LayoutMainService', () => {
  let service: LayoutMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AllowedInterview.GuardService } from './allowed-interview.guard.service';

describe('AllowedInterview.GuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllowedInterview.GuardService = TestBed.get(AllowedInterview.GuardService);
    expect(service).toBeTruthy();
  });
});

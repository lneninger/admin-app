import { TestBed } from '@angular/core/testing';

import { DocumentEndpointService } from './document-endpoint.service';

describe('DocumentEndpointService', () => {
  let service: DocumentEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { OperationSponsorsService } from './operation-sponsors.service';

describe('OperationSponsorsService', () => {
  let service: OperationSponsorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationSponsorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

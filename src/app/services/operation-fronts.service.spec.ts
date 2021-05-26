import { TestBed } from '@angular/core/testing';

import { OperationFrontsService } from './operation-fronts.service';

describe('OperationFrontsService', () => {
  let service: OperationFrontsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationFrontsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

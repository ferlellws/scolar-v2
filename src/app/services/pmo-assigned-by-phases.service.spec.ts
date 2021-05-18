import { TestBed } from '@angular/core/testing';

import { PmoAssignedByPhasesService } from './pmo-assigned-by-phases.service';

describe('PmoAssignedByPhasesService', () => {
  let service: PmoAssignedByPhasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmoAssignedByPhasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

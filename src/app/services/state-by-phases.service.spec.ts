import { TestBed } from '@angular/core/testing';

import { StateByPhasesService } from './state-by-phases.service';

describe('StateByPhasesService', () => {
  let service: StateByPhasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateByPhasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LeaderByPhasesService } from './leader-by-phases.service';

describe('LeaderByPhasesService', () => {
  let service: LeaderByPhasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderByPhasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

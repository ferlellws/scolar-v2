import { TestBed } from '@angular/core/testing';

import { PhaseByProjectsService } from './phase-by-projects.service';

describe('PhaseByProjectsService', () => {
  let service: PhaseByProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhaseByProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

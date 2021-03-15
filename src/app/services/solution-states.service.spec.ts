import { TestBed } from '@angular/core/testing';

import { SolutionStatesService } from './solution-states.service';

describe('SolutionStatesService', () => {
  let service: SolutionStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SponsorByPhasesService } from './sponsor-by-phases.service';

describe('SponsorByPhasesService', () => {
  let service: SponsorByPhasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponsorByPhasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

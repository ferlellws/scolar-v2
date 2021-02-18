import { TestBed } from '@angular/core/testing';

import { RiskLevelsService } from './risk-levels.service';

describe('RiskLevelsService', () => {
  let service: RiskLevelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskLevelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

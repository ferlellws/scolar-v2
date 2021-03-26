import { TestBed } from '@angular/core/testing';

import { IndicatorsReportsService } from './indicators-reports.service';

describe('IndicatorsReportsService', () => {
  let service: IndicatorsReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicatorsReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DesviationCausesService } from './desviation-causes.service';

describe('DesviationCausesService', () => {
  let service: DesviationCausesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesviationCausesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

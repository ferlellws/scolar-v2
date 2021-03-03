import { TestBed } from '@angular/core/testing';

import { ValoremSchedulesService } from './valorem-schedules.service';

describe('ValoremSchedulesService', () => {
  let service: ValoremSchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoremSchedulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

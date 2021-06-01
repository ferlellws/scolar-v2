import { TestBed } from '@angular/core/testing';

import { TimeCapacityService } from './time-capacity.service';

describe('TimeCapacityService', () => {
  let service: TimeCapacityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeCapacityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

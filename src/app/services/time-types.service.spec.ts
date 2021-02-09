import { TestBed } from '@angular/core/testing';

import { TimeTypesService } from './time-types.service';

describe('TimeTypesService', () => {
  let service: TimeTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

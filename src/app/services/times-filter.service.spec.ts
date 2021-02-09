import { TestBed } from '@angular/core/testing';

import { TimesFilterService } from './times-filter.service';

describe('TimesFilterService', () => {
  let service: TimesFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

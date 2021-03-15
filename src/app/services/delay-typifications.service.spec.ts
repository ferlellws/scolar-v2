import { TestBed } from '@angular/core/testing';

import { DelayTypificationsService } from './delay-typifications.service';

describe('DelayTypificationsService', () => {
  let service: DelayTypificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelayTypificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

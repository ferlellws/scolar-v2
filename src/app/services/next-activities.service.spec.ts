import { TestBed } from '@angular/core/testing';

import { NextActivitiesService } from './next-activities.service';

describe('NextActivitiesService', () => {
  let service: NextActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StrategicApproachesService } from './strategic-approaches.service';

describe('StrategicApproachesService', () => {
  let service: StrategicApproachesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategicApproachesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StrategicGuidelinesService } from './strategic-guidelines.service';

describe('StrategicGuidelinesService', () => {
  let service: StrategicGuidelinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategicGuidelinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

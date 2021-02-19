import { TestBed } from '@angular/core/testing';

import { VicePresidenciesService } from './vice-presidencies.service';

describe('VicePresidenciesService', () => {
  let service: VicePresidenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VicePresidenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

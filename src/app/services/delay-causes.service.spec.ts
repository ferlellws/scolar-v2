import { TestBed } from '@angular/core/testing';

import { DelayCausesService } from './delay-causes.service';

describe('DelayCausesService', () => {
  let service: DelayCausesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelayCausesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

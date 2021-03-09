import { TestBed } from '@angular/core/testing';

import { ValoremService } from './valorem.service';

describe('ValoremService', () => {
  let service: ValoremService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoremService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

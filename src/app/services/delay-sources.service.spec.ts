import { TestBed } from '@angular/core/testing';

import { DelaySourcesService } from './delay-sources.service';

describe('DelaySourcesService', () => {
  let service: DelaySourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelaySourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DelayTypificationBySourcesService } from './delay-typification-by-sources.service';

describe('DelayTypificationBySourcesService', () => {
  let service: DelayTypificationBySourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelayTypificationBySourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DelayCauseBySourcesService } from './delay-cause-by-sources.service';

describe('DelayCauseBySourcesService', () => {
  let service: DelayCauseBySourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelayCauseBySourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

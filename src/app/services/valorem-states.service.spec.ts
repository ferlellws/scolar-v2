import { TestBed } from '@angular/core/testing';

import { ValoremStatesService } from './valorem-states.service';

describe('ValoremStatesService', () => {
  let service: ValoremStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoremStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

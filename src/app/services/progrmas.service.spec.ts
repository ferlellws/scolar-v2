import { TestBed } from '@angular/core/testing';

import { ProgrmasService } from './progrmas.service';

describe('ProgrmasService', () => {
  let service: ProgrmasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrmasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

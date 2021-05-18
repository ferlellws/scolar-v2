import { TestBed } from '@angular/core/testing';

import { SupportResourcesService } from './support-resources.service';

describe('SupportResourcesService', () => {
  let service: SupportResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

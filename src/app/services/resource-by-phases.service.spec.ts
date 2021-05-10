import { TestBed } from '@angular/core/testing';

import { ResourceByPhasesService } from './resource-by-phases.service';

describe('ResourceByPhasesService', () => {
  let service: ResourceByPhasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceByPhasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

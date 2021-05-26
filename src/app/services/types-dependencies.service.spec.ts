import { TestBed } from '@angular/core/testing';

import { TypesDependenciesService } from './types-dependencies.service';

describe('TypesDependenciesService', () => {
  let service: TypesDependenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesDependenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

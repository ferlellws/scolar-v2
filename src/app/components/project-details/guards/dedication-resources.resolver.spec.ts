import { TestBed } from '@angular/core/testing';

import { DedicationResourcesResolver } from './dedication-resources.resolver';

describe('DedicationResourcesResolver', () => {
  let resolver: DedicationResourcesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DedicationResourcesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

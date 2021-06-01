import { TestBed } from '@angular/core/testing';

import { PhasesTimeCapacityResolver } from './phases-time-capacity.resolver';

describe('PhasesTimeCapacityResolver', () => {
  let resolver: PhasesTimeCapacityResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PhasesTimeCapacityResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PhasesResolver } from './phases.resolver';

describe('PhasesResolver', () => {
  let resolver: PhasesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PhasesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

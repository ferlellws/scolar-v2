import { TestBed } from '@angular/core/testing';

import { StateByPhasesResolver } from './state-by-phases.resolver';

describe('StateByPhasesResolver', () => {
  let resolver: StateByPhasesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StateByPhasesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

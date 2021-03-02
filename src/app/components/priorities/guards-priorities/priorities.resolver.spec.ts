import { TestBed } from '@angular/core/testing';

import { PrioritiesResolver } from './priorities.resolver';

describe('PrioritiesResolver', () => {
  let resolver: PrioritiesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PrioritiesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SponsorsResolver } from './sponsors.resolver';

describe('SponsorsResolver', () => {
  let resolver: SponsorsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SponsorsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

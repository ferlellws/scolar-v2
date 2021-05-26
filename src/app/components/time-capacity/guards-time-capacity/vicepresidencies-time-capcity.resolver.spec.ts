import { TestBed } from '@angular/core/testing';

import { VicepresidenciesTimeCapcityResolver } from './vicepresidencies-time-capcity.resolver';

describe('VicepresidenciesTimeCapcityResolver', () => {
  let resolver: VicepresidenciesTimeCapcityResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VicepresidenciesTimeCapcityResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { VicePresidenciesResolver } from './vice-presidencies.resolver';

describe('VicePresidenciesResolver', () => {
  let resolver: VicePresidenciesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VicePresidenciesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

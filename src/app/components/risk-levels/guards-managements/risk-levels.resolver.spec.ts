import { TestBed } from '@angular/core/testing';

import { RiskLevelsResolver } from './risk-levels.resolver';

describe('ManagementsResolver', () => {
  let resolver: RiskLevelsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RiskLevelsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { DesviationCausesByVicepresidenciesResolver } from './desviation-causes-by-vicepresidencies.resolver';

describe('DesviationCausesByVicepresidenciesResolver', () => {
  let resolver: DesviationCausesByVicepresidenciesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DesviationCausesByVicepresidenciesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

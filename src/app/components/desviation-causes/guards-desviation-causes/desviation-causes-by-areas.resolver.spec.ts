import { TestBed } from '@angular/core/testing';
import { DesviationCausesByAreasResolver } from './desviation-causes-by-areas.resolver';

describe('DesviationCausesByAreasResolver', () => {
  let resolver: DesviationCausesByAreasResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DesviationCausesByAreasResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

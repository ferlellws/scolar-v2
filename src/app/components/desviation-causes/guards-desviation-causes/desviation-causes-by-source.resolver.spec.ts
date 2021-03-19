import { TestBed } from '@angular/core/testing';
import { DesviationCausesBySourceResolver } from './desviation-causes-by-source.resolver';

describe('DesviationCausesBySourceResolver', () => {
  let resolver: DesviationCausesBySourceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DesviationCausesBySourceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

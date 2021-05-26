import { TestBed } from '@angular/core/testing';

import { DesviationCausesTypificationsBySourcesResolver } from './desviation-causes-typifications-by-sources.resolver';

describe('DesviationCausesTypificationsBySourcesResolver', () => {
  let resolver: DesviationCausesTypificationsBySourcesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DesviationCausesTypificationsBySourcesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

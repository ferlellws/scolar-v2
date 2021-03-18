import { TestBed } from '@angular/core/testing';

import { DesviationByProjectResolver } from './desviation-by-project.resolver';

describe('DesviationByProjectResolver', () => {
  let resolver: DesviationByProjectResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DesviationByProjectResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

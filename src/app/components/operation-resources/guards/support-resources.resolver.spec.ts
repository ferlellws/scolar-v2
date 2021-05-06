import { TestBed } from '@angular/core/testing';

import { SupportResourcesResolver } from './support-resources.resolver';

describe('SupportResourcesResolver', () => {
  let resolver: SupportResourcesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SupportResourcesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

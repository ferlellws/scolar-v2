import { TestBed } from '@angular/core/testing';

import { ResourcesTimeCapacityResolver } from './resources-time-capacity.resolver';

describe('ResourcesTimeCapacityResolver', () => {
  let resolver: ResourcesTimeCapacityResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResourcesTimeCapacityResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

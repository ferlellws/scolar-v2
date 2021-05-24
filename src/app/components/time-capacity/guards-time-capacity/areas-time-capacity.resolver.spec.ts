import { TestBed } from '@angular/core/testing';

import { AreasTimeCapacityResolver } from './areas-time-capacity.resolver';

describe('AreasTimeCapacityResolver', () => {
  let resolver: AreasTimeCapacityResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AreasTimeCapacityResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

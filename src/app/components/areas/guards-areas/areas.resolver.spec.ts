import { TestBed } from '@angular/core/testing';

import { AreasResolver } from './areas.resolver';

describe('AreasResolver', () => {
  let resolver: AreasResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AreasResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

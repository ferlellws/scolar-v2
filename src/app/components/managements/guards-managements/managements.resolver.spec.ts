import { TestBed } from '@angular/core/testing';

import { ManagementsResolver } from './managements.resolver';

describe('ManagementsResolver', () => {
  let resolver: ManagementsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ManagementsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

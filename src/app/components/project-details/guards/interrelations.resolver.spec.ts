import { TestBed } from '@angular/core/testing';

import { InterrelationsResolver } from './interrelations.resolver';

describe('InterrelationsResolver', () => {
  let resolver: InterrelationsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InterrelationsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

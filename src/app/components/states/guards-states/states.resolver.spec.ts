import { TestBed } from '@angular/core/testing';

import { StatesResolver } from './states.resolver';

describe('StatesResolver', () => {
  let resolver: StatesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StatesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

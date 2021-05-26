import { TestBed } from '@angular/core/testing';

import { InitialGraphResolver } from './initial-graph.resolver';

describe('InitialGraphResolver', () => {
  let resolver: InitialGraphResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InitialGraphResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

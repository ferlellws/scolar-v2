import { TestBed } from '@angular/core/testing';

import { StagesResolver } from './stages.resolver';

describe('StagesResolver', () => {
  let resolver: StagesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StagesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GeneralTopResolver } from './general-top.resolver';

describe('GeneralTopResolver', () => {
  let resolver: GeneralTopResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GeneralTopResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

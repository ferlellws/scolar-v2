import { TestBed } from '@angular/core/testing';

import { VicePresidencyResolver } from './vice-presidency.resolver';

describe('VicePresidencyResolver', () => {
  let resolver: VicePresidencyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VicePresidencyResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

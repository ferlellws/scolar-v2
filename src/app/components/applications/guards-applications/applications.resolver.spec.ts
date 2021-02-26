import { TestBed } from '@angular/core/testing';

import { ApplicationsResolver } from './applications.resolver';

describe('ApplicationsResolver', () => {
  let resolver: ApplicationsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ApplicationsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

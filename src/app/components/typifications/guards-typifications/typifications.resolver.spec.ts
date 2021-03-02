import { TestBed } from '@angular/core/testing';

import { TypificationsResolver } from './typifications.resolver';

describe('CompanyTypesResolver', () => {
  let resolver: TypificationsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TypificationsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

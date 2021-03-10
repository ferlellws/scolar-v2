import { TestBed } from '@angular/core/testing';

import { CompanyTypesResolver } from './company-types.resolver';

describe('CompanyTypesResolver', () => {
  let resolver: CompanyTypesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompanyTypesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

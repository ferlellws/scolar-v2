import { TestBed } from '@angular/core/testing';

import { GeneralUsersResolver } from './general-users.resolver';

describe('CompaniesResolver', () => {
  let resolver: GeneralUsersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GeneralUsersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

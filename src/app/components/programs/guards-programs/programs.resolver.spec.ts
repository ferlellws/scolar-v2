import { TestBed } from '@angular/core/testing';

import { ProgramsResolver } from './programs.resolver';

describe('CompanyTypesResolver', () => {
  let resolver: ProgramsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProgramsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

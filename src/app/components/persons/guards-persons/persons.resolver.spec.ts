import { TestBed } from '@angular/core/testing';

import { PersonsResolver } from './persons.resolver';

describe('PersonsResolver', () => {
  let resolver: PersonsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PersonsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

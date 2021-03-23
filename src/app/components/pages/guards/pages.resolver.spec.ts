import { TestBed } from '@angular/core/testing';

import { PagesResolver } from './pages.resolver';

describe('PagesResolver', () => {
  let resolver: PagesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PagesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

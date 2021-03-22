import { TestBed } from '@angular/core/testing';

import { MenuModulesResolver } from './menu-modules.resolver';

describe('MenuModulesResolver', () => {
  let resolver: MenuModulesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MenuModulesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

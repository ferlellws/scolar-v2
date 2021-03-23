import { TestBed } from '@angular/core/testing';

import { MenuModulesService } from './menu-modules.service';

describe('MenuModulesService', () => {
  let service: MenuModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

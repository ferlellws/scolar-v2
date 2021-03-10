import { TestBed } from '@angular/core/testing';

import { MainCreateTablesService } from './main-create-tables.service';

describe('MainCreateTablesService', () => {
  let service: MainCreateTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainCreateTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

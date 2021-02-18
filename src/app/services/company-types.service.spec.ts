import { TestBed } from '@angular/core/testing';

import { CompanyTypesService } from './company-types.service';

describe('CompanyTypesService', () => {
  let service: CompanyTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

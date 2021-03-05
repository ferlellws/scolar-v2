import { TestBed } from '@angular/core/testing';

import { CompaniesByProjectService } from './companies-by-project.service';

describe('CompaniesByProjectService', () => {
  let service: CompaniesByProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniesByProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

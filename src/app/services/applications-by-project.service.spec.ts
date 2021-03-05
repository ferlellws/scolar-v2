import { TestBed } from '@angular/core/testing';

import { ApplicationsByProjectService } from './applications-by-project.service';

describe('ApplicationsByProjectService', () => {
  let service: ApplicationsByProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsByProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

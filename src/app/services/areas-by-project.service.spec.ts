import { TestBed } from '@angular/core/testing';

import { AreasByProjectService } from './areas-by-project.service';

describe('AreasByProjectService', () => {
  let service: AreasByProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreasByProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

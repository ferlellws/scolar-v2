import { TestBed } from '@angular/core/testing';

import { ProjectProgressReportService } from './project-progress-report.service';

describe('ProjectProgressReportService', () => {
  let service: ProjectProgressReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectProgressReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

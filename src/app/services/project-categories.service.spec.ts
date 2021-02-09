import { TestBed } from '@angular/core/testing';

import { ProjectCategoriesService } from './project-categories.service';

describe('ProjectCategoriesService', () => {
  let service: ProjectCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

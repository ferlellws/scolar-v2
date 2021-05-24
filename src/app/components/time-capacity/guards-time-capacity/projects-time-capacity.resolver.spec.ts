import { TestBed } from '@angular/core/testing';

import { ProjectsTimeCapacityResolver } from './projects-time-capacity.resolver';

describe('ProjectsTimeCapacityResolver', () => {
  let resolver: ProjectsTimeCapacityResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProjectsTimeCapacityResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProjectsDashboardOwnResolver } from './projects-dashboard-own.resolver';

describe('ProjectsDashboardOwnResolver', () => {
  let resolver: ProjectsDashboardOwnResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProjectsDashboardOwnResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DashboardProjectsResolver } from './dashboard-projects.resolver';

describe('DashboardProjectsResolver', () => {
  let resolver: DashboardProjectsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DashboardProjectsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

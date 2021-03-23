import { TestBed } from '@angular/core/testing';

import { ProjectsOwnResolver } from './projects-own.resolver';

describe('ProjectsOwnResolver', () => {
  let resolver: ProjectsOwnResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProjectsOwnResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

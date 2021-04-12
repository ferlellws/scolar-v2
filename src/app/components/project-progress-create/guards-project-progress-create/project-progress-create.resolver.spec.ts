import { TestBed } from '@angular/core/testing';

import { ProjectProgressCreateResolver } from './project-progress-create.resolver';

describe('ProjectProgressCreateResolver', () => {
  let resolver: ProjectProgressCreateResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProjectProgressCreateResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

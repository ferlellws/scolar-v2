import { TestBed } from '@angular/core/testing';

import { ProjectOperationResourcesResolver } from './project.resolver';

describe('ProjectOperationResourcesResolver', () => {
  let resolver: ProjectOperationResourcesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProjectOperationResourcesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

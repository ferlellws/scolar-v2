import { TestBed } from '@angular/core/testing';

import { ProjectsByVicepresidencyResolver } from './projects-by-vicepresidency.resolver';

describe('ProjectsByVicepresidencyResolver', () => {
  let resolver: ProjectsByVicepresidencyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProjectsByVicepresidencyResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

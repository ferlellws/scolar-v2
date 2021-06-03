import { TestBed } from '@angular/core/testing';

import { SponsorsByProjectsResolver } from './sponsors-by-projects.resolver';

describe('SponsorsByProjectsResolver', () => {
  let resolver: SponsorsByProjectsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SponsorsByProjectsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

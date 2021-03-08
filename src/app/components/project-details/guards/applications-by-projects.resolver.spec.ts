import { TestBed } from '@angular/core/testing';
import { ApplicationsByProjectsResolver } from './applications-by-projects.resolver';


describe('ProjectDetailsResolver', () => {
  let resolver: ApplicationsByProjectsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ApplicationsByProjectsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { TestUsersByProjectsResolver } from './test-users-by-projects.resolver';


describe('TestUsersByProjectsResolver', () => {
  let resolver: TestUsersByProjectsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TestUsersByProjectsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

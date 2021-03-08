import { TestBed } from '@angular/core/testing';
import { CompaniesByProjectsResolver } from './companies-by-projects.resolver';


describe('CompaniesByProjectsResolver', () => {
  let resolver: CompaniesByProjectsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompaniesByProjectsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

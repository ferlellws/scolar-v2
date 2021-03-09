import { TestBed } from '@angular/core/testing';
import { AreasByProjectsResolver } from './areas-by-projects.resolver';


describe('AreasByProjectsResolver', () => {
  let resolver: AreasByProjectsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AreasByProjectsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

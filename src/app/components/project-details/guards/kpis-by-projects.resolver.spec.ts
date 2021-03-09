import { TestBed } from '@angular/core/testing';
import { KpisByProjectsResolver } from './kpis-by-projects.resolver';

describe('KpisByProjectsResolver', () => {
  let resolver: KpisByProjectsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(KpisByProjectsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

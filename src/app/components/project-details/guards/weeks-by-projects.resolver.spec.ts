import { TestBed } from '@angular/core/testing';
import { WeeksByProjectsResolver } from './weeks-by-projects.resolver';

describe('WeeksByProjectsResolver', () => {
  let resolver: WeeksByProjectsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WeeksByProjectsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { HighlightsByProjectsResolver } from './highlights-by-projects.resolver';

describe('HighlightsByProjectsResolver', () => {
  let resolver: HighlightsByProjectsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HighlightsByProjectsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

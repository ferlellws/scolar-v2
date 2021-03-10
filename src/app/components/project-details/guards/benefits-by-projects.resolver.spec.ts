import { TestBed } from '@angular/core/testing';
import { BenefitsByProjectsResolver } from './benefits-by-projects.resolver';

describe('BenefitsByProjectsResolver', () => {
  let resolver: BenefitsByProjectsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BenefitsByProjectsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

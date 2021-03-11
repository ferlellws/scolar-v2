import { TestBed } from '@angular/core/testing';
import { ObseravtionsByWeeksResolver } from './observations-by-weeks.resolver';

describe('ObseravtionsByWeeksResolver', () => {
  let resolver: ObseravtionsByWeeksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ObseravtionsByWeeksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

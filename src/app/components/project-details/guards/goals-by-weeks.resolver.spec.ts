import { TestBed } from '@angular/core/testing';
import { GoalsByWeeksResolver } from './goals-by-weeks.resolver';

describe('GoalsByWeeksResolver', () => {
  let resolver: GoalsByWeeksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GoalsByWeeksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { NextActivitiesByWeeksResolver } from './next-activities-by-weeks.resolver';

describe('NextActivitiesByWeeksResolver', () => {
  let resolver: NextActivitiesByWeeksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NextActivitiesByWeeksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

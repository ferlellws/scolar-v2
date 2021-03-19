import { TestBed } from '@angular/core/testing';
import { DesviationCausesByTypificationsResolver } from './desviation-causes-by-typifications.resolver';

describe('DesviationCausesByTypificationsResolver', () => {
  let resolver: DesviationCausesByTypificationsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DesviationCausesByTypificationsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

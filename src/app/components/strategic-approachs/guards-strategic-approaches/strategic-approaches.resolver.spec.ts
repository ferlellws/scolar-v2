import { TestBed } from '@angular/core/testing';

import { StrategicApproachesResolver } from './strategic-approaches.resolver';

describe('StrategicApproachesResolver', () => {
  let resolver: StrategicApproachesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StrategicApproachesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

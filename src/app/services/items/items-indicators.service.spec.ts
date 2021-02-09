import { TestBed } from '@angular/core/testing';

import { ItemsIndicatorsService } from './items-indicators.service';

describe('ItemsIndicatorsService', () => {
  let service: ItemsIndicatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsIndicatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

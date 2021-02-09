import { TestBed } from '@angular/core/testing';

import { ItemHistoriesFilterService } from './item-histories-filter.service';

describe('ItemHistoriesFilterService', () => {
  let service: ItemHistoriesFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemHistoriesFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ItemResolutionsService } from './item-resolutions.service';

describe('ItemResolutionsService', () => {
  let service: ItemResolutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemResolutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

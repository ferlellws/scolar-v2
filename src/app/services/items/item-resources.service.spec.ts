import { TestBed } from '@angular/core/testing';

import { ItemResourcesService } from './item-resources.service';

describe('ItemResourcesService', () => {
  let service: ItemResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

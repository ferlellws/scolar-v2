import { TestBed } from '@angular/core/testing';

import { ItemSeveritiesService } from './item-severities.service';

describe('ItemSeveritiesService', () => {
  let service: ItemSeveritiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemSeveritiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

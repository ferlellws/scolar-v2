import { TestBed } from '@angular/core/testing';

import { ItemPrioritiesService } from './item-priorities.service';

describe('ItemPrioritiesService', () => {
  let service: ItemPrioritiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemPrioritiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ItemTimesService } from './item-times.service';

describe('ItemTimesService', () => {
  let service: ItemTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

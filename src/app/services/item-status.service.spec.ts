import { TestBed } from '@angular/core/testing';

import { ItemStatusService } from './item-status.service';

describe('ItemStatusService', () => {
  let service: ItemStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

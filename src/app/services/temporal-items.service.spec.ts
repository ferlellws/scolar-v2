import { TestBed } from '@angular/core/testing';

import { TemporalItemsService } from './temporal-items.service';

describe('TemporalItemsService', () => {
  let service: TemporalItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporalItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

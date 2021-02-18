import { TestBed } from '@angular/core/testing';

import { TypificationsService } from './typifications.service';

describe('TypificationsService', () => {
  let service: TypificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

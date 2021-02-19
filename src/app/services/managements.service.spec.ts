import { TestBed } from '@angular/core/testing';

import { ManagementsService } from './managements.service';

describe('ManagementsService', () => {
  let service: ManagementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

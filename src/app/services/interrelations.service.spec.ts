import { TestBed } from '@angular/core/testing';

import { InterrelationsService } from './interrelations.service';

describe('InterrelationsService', () => {
  let service: InterrelationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterrelationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

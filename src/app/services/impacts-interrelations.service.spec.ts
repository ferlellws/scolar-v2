import { TestBed } from '@angular/core/testing';

import { ImpactsInterrelationsService } from './impacts-interrelations.service';

describe('ImpactsInterrelationsService', () => {
  let service: ImpactsInterrelationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpactsInterrelationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

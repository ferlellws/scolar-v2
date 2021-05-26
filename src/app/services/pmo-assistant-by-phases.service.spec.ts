import { TestBed } from '@angular/core/testing';

import { PmoAssistantByPhasesService } from './pmo-assistant-by-phases.service';

describe('PmoAssistantByPhasesService', () => {
  let service: PmoAssistantByPhasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmoAssistantByPhasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

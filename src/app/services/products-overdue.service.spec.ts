import { TestBed } from '@angular/core/testing';

import { ProductsOverdueService } from './products-overdue.service';

describe('ProductsOverdueService', () => {
  let service: ProductsOverdueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsOverdueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProductsDeliveredService } from './products-delivered.service';

describe('ProductsDeliveredService', () => {
  let service: ProductsDeliveredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsDeliveredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

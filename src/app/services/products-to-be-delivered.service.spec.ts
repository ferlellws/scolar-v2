import { TestBed } from '@angular/core/testing';

import { ProductsToBeDeliveredService } from './products-to-be-delivered.service';

describe('ProductsToBeDeliveredService', () => {
  let service: ProductsToBeDeliveredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsToBeDeliveredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { ReceiptproductService } from './receiptproduct.service';

describe('ReceiptproductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiptproductService]
    });
  });

  it('should be created', inject([ReceiptproductService], (service: ReceiptproductService) => {
    expect(service).toBeTruthy();
  }));
});

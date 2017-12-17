import { TestBed, inject } from '@angular/core/testing';

import { ReceiptProductService } from './receiptproduct.service';

describe('ReceiptProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiptProductService]
    });
  });

  it('should be created', inject([ReceiptProductService], (service: ReceiptProductService) => {
    expect(service).toBeTruthy();
  }));
});

import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "./api.service";

@Injectable()
export class ReceiptProductService {

  constructor(private http: HttpClient,
              private apiSerive: ApiService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getReceiptProductByReceipt(receiptId:number) {
    return this.http.get(this.apiSerive.getReceiptProductsUrl() + "/receipt/"+receiptId)
      .toPromise()
      .catch(this.handleError);
  }

  getReceiptProductByProduct(productId:number) {
    return this.http.get(this.apiSerive.getReceiptProductsUrl() + "/product/"+productId)
      .toPromise()
      .catch(this.handleError);
  }

}

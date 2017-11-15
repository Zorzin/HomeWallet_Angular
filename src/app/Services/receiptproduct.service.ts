import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ReceiptproductService {

  private apiUrl = 'http://localhost:54044/api/receiptproducts';  // URL to web api
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userId : string;

  private response : any;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getReceiptProductByReceipt(receiptId:number) {
    return this.http.get(this.apiUrl + "/receipt/"+receiptId)
      .toPromise()
      .catch(this.handleError);
  }

  getReceiptProductByProduct(productId:number) {
    return this.http.get(this.apiUrl + "/product/"+productId)
      .toPromise()
      .catch(this.handleError);
  }

}

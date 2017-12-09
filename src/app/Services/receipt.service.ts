import { Injectable } from '@angular/core';
import {Headers,Http} from "@angular/http";
import {Receipt} from "../Models/receipt";
import {log} from "util";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ReceiptCreate} from "../Models/receipt-create";
import {ReceiptCyclicalCreate} from "../Models/receipt-cyclical-create";

@Injectable()
export class ReceiptService {

  private apiUrl = 'http://localhost:54044/api/receipts/1';  // URL to web api
  private apiCyclicalUrl = 'http://localhost:54044/api/receipts/cyclical/1';  // URL to web api

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getReceipts() {
    return this.http.get(this.apiUrl)
      .toPromise()
      .catch(this.handleError);
  }

  getReceiptTotalValue(id:number) {
    return this.http.get(this.apiUrl+"/totalValue/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  getReceipt(id:number) {
    return this.http.get(this.apiUrl+"/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  createReceipt(receipt: ReceiptCreate)
  {
    let body = JSON.stringify(receipt);
    log(body);
    return this.http.post(this.apiUrl,body,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  createReceiptCyclical(receipt: ReceiptCyclicalCreate)
  {
    let body = JSON.stringify(receipt);
    log(body);
    return this.http.post(this.apiCyclicalUrl,body,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  removeReceipt(id: number)
  {
    return this.http.delete(this.apiUrl+"/"+id)
      .subscribe();
  }
}
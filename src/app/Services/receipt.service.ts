import { Injectable } from '@angular/core';
import {Headers,Http} from "@angular/http";
import {Receipt} from "../Models/receipt";
import {log} from "util";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ReceiptService {

  private apiUrl = 'http://localhost:54044/api/receipts/1';  // URL to web api
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
}

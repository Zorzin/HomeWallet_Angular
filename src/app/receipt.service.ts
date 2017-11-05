import { Injectable } from '@angular/core';
import {Headers,Http} from "@angular/http";
import {Receipt} from "./receipt";

@Injectable()
export class ReceiptService {

  private apiUrl = 'api/receipts';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getReceiptsByDaysFromNow(days): Promise<Receipt[]>{
      return this.http.get(this.apiUrl+"/"+days)
        .toPromise()
        .then(response=> response.json().data as Receipt[])
        .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

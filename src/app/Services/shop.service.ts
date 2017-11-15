import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ShopService {
  private apiUrl = 'http://localhost:54044/api/shops/1';  // URL to web api
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userId : string;

  private response : any;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getShop(id:number) {
    return this.http.get(this.apiUrl + "/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  getShops() {
    return this.http.get(this.apiUrl)
      .toPromise()
      .catch(this.handleError);
  }

}

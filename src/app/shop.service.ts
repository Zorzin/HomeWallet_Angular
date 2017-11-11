import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class ShopService {
  private apiUrl = 'http://localhost:54044/api/shops/1';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private userId : string;

  private response : any;

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getShop(id:number) {
    return this.http.get(this.apiUrl + "/"+id)
      .toPromise()
      .then(response=> response.json())
      .catch(this.handleError);
  }

}

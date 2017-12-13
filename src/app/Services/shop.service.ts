import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ShopService {
  private apiUrl = 'http://localhost:54044/api/shops/1';  // URL to web api
  private apiProductsUrl = 'http://localhost:54044/api/shops/products/1';  // URL to web api
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

  getShopProducts(id:number) {
    return this.http.get(this.apiProductsUrl + "/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  getShops() {
    return this.http.get(this.apiUrl)
      .toPromise()
      .catch(this.handleError);
  }

  createShop(shopName: string){
    return this.http.post(this.apiUrl,"\""+shopName+"\"",{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  deleteShop(id:number) {
    return this.http.delete(this.apiUrl+"/"+id,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  editShop(id:number,newName: string) {
    return this.http.put(this.apiUrl+"/"+id+"/"+newName,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }
}

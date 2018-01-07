import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserInfoService} from "./user-id.service";

@Injectable()
export class ShopService {
  private apiUrl = 'http://localhost:54044/api/shops/';  // URL to web api
  private apiProductsUrl = 'http://localhost:54044/api/shops/products/';  // URL to web api
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userId : string;

  private response : any;

  constructor(private http: HttpClient,
              private userService: UserInfoService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getShop(id:number) {
    return this.http.get(this.apiUrl+this.userService.getUserId() + "/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  getShopProducts(id:number) {
    return this.http.get(this.apiProductsUrl+this.userService.getUserId() + "/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  getShops() {
    return this.http.get(this.apiUrl+this.userService.getUserId())
      .toPromise()
      .catch(this.handleError);
  }

  createShop(shopName: string){
    return this.http.post(this.apiUrl+this.userService.getUserId(),"\""+shopName+"\"",{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  deleteShop(id:number) {
    return this.http.delete(this.apiUrl+this.userService.getUserId()+"/"+id,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  editShop(id:number,newName: string) {
    return this.http.put(this.apiUrl+this.userService.getUserId()+"/"+id+"/"+newName,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }
}

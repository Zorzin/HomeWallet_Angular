import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserInfoService} from "./user-id.service";

@Injectable()
export class ShopService {
  private apiUrl = 'http://homewalletapi.azurewebsites.net/api/shops/';  // URL to web api
  private apiProductsUrl = 'http://homewalletapi.azurewebsites.net/api/shops/products/';  // URL to web api
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  private shops : any;

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

  getShopStatistics(id:number, startDate:string, endDate:string) {
    return this.http.get(this.apiUrl+"summary/"+this.userService.getUserId() + "/"+id+"/"+startDate+"/"+endDate)
      .toPromise()
      .catch(this.handleError);
  }

  getShops() {
    return this.http.get(this.apiUrl+this.userService.getUserId())
      .toPromise()
      .then(response=>this.shops = response)
      .catch(this.handleError);
  }

  createShop(shopName: string){
    return this.http.post(this.apiUrl+this.userService.getUserId(),"\""+shopName+"\"",{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  deleteShop(id:number) {
    return this.http.delete(this.apiUrl+this.userService.getUserId()+"/"+id,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  editShop(id:number,newName: string) {
    return this.http.put(this.apiUrl+this.userService.getUserId()+"/"+id+"/"+newName,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }


  checkName(name:string,currentName:string):boolean{
    if(this.shops)
    {
      for(let shop of this.shops){
        if(shop.name==name && shop.name!=currentName){
          return true;
        }
      }
    }
    return false;
  }
  ifShopExist(name:string, currentName:string):boolean{
    if(!this.shops){
      this.getShops().then(()=>{
        return this.checkName(name,currentName);
      })
    }
    return this.checkName(name,currentName);
  }
}
